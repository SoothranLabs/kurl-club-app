import { SelectContent, SelectItem } from '@/components/ui/select';
import { KSelect } from '@/components/form/k-select';
import { formatFieldName } from '@/lib/utils';

interface FieldMapperProps {
  requiredFields: string[];
  headers: string[];
  mappings: { [key: string]: string };
  errors: { [key: string]: string };
  updateMapping: (field: string, value: string) => void;
}
export const FieldMapper = ({
  requiredFields,
  headers,
  mappings,
  errors,
  updateMapping,
}: FieldMapperProps) => {
  return (
    <div>
      {requiredFields.map((field) => (
        <div key={field} className="mb-4">
          <KSelect
            value={mappings[field] || ''}
            onValueChange={(value) => updateMapping(field, value)}
            label={formatFieldName(field)}
          >
            <SelectContent className="shad-select-content">
              {headers.map((header) => (
                <SelectItem
                  key={header}
                  value={header}
                  className="shad-select-item"
                >
                  {header}
                </SelectItem>
              ))}
            </SelectContent>
          </KSelect>
          {errors[field] && (
            <p className="text-alert-red-400 before:content-['*'] before:mr-[1px]">
              {errors[field]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
