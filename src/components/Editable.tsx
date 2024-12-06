import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditableFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => void;
  isEditing: boolean;
  type?: 'text' | 'dropdown';
  options?: string[];
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  name,
  value,
  onChange,
  isEditing,
  type = 'text',
  options = [],
}) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    {isEditing ? (
      type === 'dropdown' ? (
        <Select
          name={name}
          value={value}
          onValueChange={(value) => onChange({ target: { name, value } })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent className="shad-select-content">
            {options.map((option) => (
              <SelectItem
                className="shad-select-item"
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="bg-gray-800 border-gray-700"
        />
      )
    ) : (
      <p className="text-gray-400">{value}</p>
    )}
  </div>
);
