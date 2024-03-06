import * as React from 'react';
import {
  APP_TEMPLATES,
  type ApplicationTemplate,
} from '@/app/(applications)/applications/new_.template/-services/app-templates';
import {TemplateTile} from './template-tile';

type InputAppTilesProps = {
  readonly value?: ApplicationTemplate;
  readonly onChange?: (selected: ApplicationTemplate) => void;
};

function InputAppTiles({value: passedValue, onChange}: InputAppTilesProps): React.ReactElement {
  const [internalValue, setInternalValue] = React.useState<ApplicationTemplate | undefined>();
  React.useEffect(() => {
    if (passedValue) setInternalValue(passedValue);
  }, [passedValue]);

  const handleSelect = React.useCallback(
    (app: ApplicationTemplate) => {
      if (app.manifest === internalValue?.manifest) return;
      setInternalValue(app);
      if (onChange) onChange(app);
    },
    [internalValue?.manifest, onChange],
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {APP_TEMPLATES.map((app) => (
        <TemplateTile
          key={app.name}
          app={app}
          isSelected={app.manifest === internalValue?.manifest}
          onClick={handleSelect}
        />
      ))}
    </div>
  );
}

export {InputAppTiles};
