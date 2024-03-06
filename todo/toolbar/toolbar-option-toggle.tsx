import {type HTMLProps} from 'react';
import Toggle from 'components/Shared/Forms/Toggle/Toggle';

type ToolbarOptionToggleProps = {
  id?: string;
  name?: string;
  label: string;
  value?: boolean;
  onChange?: (checked: boolean) => void;
} & Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'value'>;

export default function ToolbarOptionToggle({
  label,
  id = '',
  name = '',
  onChange = () => null,
  value = false,
  ...toggleProperties
}: ToolbarOptionToggleProps): JSX.Element {
  return (
    <div className="flex text-sm text-spaceBlue">
      {label}
      <div className="ml-auto">
        <Toggle id={id} name={name} onChange={onChange} value={value} {...toggleProperties} />
      </div>
    </div>
  );
}
