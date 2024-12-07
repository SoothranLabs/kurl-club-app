import { useState, useCallback } from 'react';
import Papa from 'papaparse';

import { Member } from '@/types';
import { formatFieldName } from '@/lib/utils';

export const useCSVImport = (requiredFields: string[]) => {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mappings, setMappings] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isMappingRequired, setIsMappingRequired] = useState(true);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      Papa.parse(file, {
        complete: (results: Papa.ParseResult<string[]>) => {
          setCsvData(results.data);
          setHeaders(results.data[0]);
          // Initialize mappings with best-guess matches // TODO: AI in future
          const initialMappings = results.data[0].reduce(
            (acc, header) => {
              const lowerHeader = header.toLowerCase();
              const match = requiredFields.find((field) =>
                lowerHeader.includes(field.toLowerCase())
              );
              if (match) {
                acc[match] = header;
              }
              return acc;
            },
            {} as { [key: string]: string }
          );
          setMappings(initialMappings);
        },
      });
    },
    [requiredFields]
  );

  const updateMapping = (field: string, value: string) => {
    setMappings((prev) => ({ ...prev, [field]: value }));
  };

  const resetImport = () => {
    setCsvData([]);
    setHeaders([]);
    setMappings({});
    setErrors({});
    setIsMappingRequired(true);
  };

  const validateAndImport = (onImport: (data: Member[]) => void) => {
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!mappings[field]) {
        newErrors[field] = `${formatFieldName(field)} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    const validRows = csvData.slice(1).filter((row) => {
      return row.some((value) => value.trim() !== '');
    });

    const importedData: Member[] = validRows.map((row, index) => {
      const member: Partial<Member> = {};
      Object.entries(mappings).forEach(([field, header]) => {
        const columnIndex = headers.indexOf(header);
        if (columnIndex !== -1) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          member[field as keyof Member] = row[columnIndex]?.trim() || '';
        }
      });

      // Auto-generate Gym No if missing
      if (!member.gymNo) {
        member.gymNo = `GYM-${(index + 1).toString().padStart(3, '0')}`;
      }

      // Set default values for missing fields
      member.id = member.id || `imported-${index + 1}`;
      member.avatar = member.avatar || '/placeholder.svg?height=32&width=32';
      member.package = member.package || 'Monthly';
      member.feeStatus = member.feeStatus || 'unpaid';

      return member as Member;
    });

    onImport(importedData);
    return true;
  };

  return {
    csvData,
    headers,
    mappings,
    errors,
    isMappingRequired,
    onDrop,
    updateMapping,
    validateAndImport,
    resetImport,
  };
};
