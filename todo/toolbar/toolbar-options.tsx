import {type PropsWithChildren, useRef, useState} from 'react';
import Icon from 'components/Shared/Icon/Icon';
import useHandleClickOutside from 'hooks/useHandleClickOutside';
import ToolbarButton from './toolbar-button.js';

type IToolbarOptionsProperties = {
  name?: string;
};

export default function ToolbarOptions({
  name = 'Options',
  children,
}: PropsWithChildren<IToolbarOptionsProperties>): JSX.Element {
  const [show, setShow] = useState(false);
  const toolbarOptionsReference = useRef<HTMLDivElement>(null);
  useHandleClickOutside(toolbarOptionsReference, () => {
    setShow(false);
  });

  return (
    <>
      <ToolbarButton
        name={name}
        icon={<Icon iconName="icon-toolbar-more" />}
        data-test-id="toolbar-options-button"
        onClick={() => {
          setShow(!show);
        }}
      />
      {show && (
        <div ref={toolbarOptionsReference} data-test-id="toolbar-options">
          {children}
        </div>
      )}
    </>
  );
}
