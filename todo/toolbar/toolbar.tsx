import {type PropsWithChildren} from 'react';

function Toolbar({children}: PropsWithChildren): JSX.Element {
  return (
    <div
      data-test-id="toolbar"
      className="absolute left-10 top-2 z-10 flex w-20 flex-col rounded-lg bg-gray-100 text-center dark:bg-gray-700"
    >
      {children}
    </div>
  );
}

export default Toolbar;
