import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Member } from '@/types';
import { useCSVImport } from '@/hooks/use-csv-import';
import { FieldMapper } from '@/components/members/field-mapper';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: Member[]) => void;
}

const requiredFields = [
  'gymNo',
  'name',
  'package',
  'feeStatus',
  'email',
  'phone',
];

export const ImportModal = ({
  isOpen,
  onClose,
  onImport,
}: ImportModalProps) => {
  const {
    csvData,
    headers,
    mappings,
    errors,
    isMappingRequired,
    onDrop,
    updateMapping,
    validateAndImport,
    resetImport,
  } = useCSVImport(requiredFields);

  const [importCompleted, setImportCompleted] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleImport = () => {
    if (validateAndImport(onImport)) {
      setImportCompleted(false);
      resetImport();
      onClose();
    }
  };

  const handleClose = () => {
    resetImport();
    setImportCompleted(false);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import CSV</DialogTitle>
        </DialogHeader>
        {csvData.length === 0 || importCompleted ? (
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 p-6 text-center"
          >
            <input {...getInputProps()} />
            <p>Drag and drop a CSV file here, or click to select one</p>
          </div>
        ) : isMappingRequired ? (
          <FieldMapper
            requiredFields={requiredFields}
            headers={headers}
            mappings={mappings}
            errors={errors}
            updateMapping={updateMapping}
          />
        ) : (
          <div className="p-6 text-center">
            <p>All required fields are mapped.</p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={handleClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={csvData.length === 0}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
