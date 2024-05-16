import {intervalToDuration} from 'date-fns';
import * as React from 'react';
import {formatDuration} from './format-duration';

type TimeAgoProps = (
  | {
      timeAgoMs: number;
    }
  | {
      date: string | Date;
    }
) & {
  readonly isShort?: boolean;
  readonly levels?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

function TimeAgo({isShort = false, levels = 3, ...props}: TimeAgoProps) {
  const date = React.useMemo(
    () =>
      'date' in props && props.date instanceof Date
        ? props.date
        : 'timeAgoMs' in props
          ? new Date(Date.now() - props.timeAgoMs * 1000)
          : new Date(),
    [props],
  );

  const text = React.useMemo(() => {
    const duration = intervalToDuration({start: date, end: Date.now()});
    return formatDuration(duration, {isShort, levels});
  }, [date, isShort, levels]);

  return <span title={date.toUTCString()}>{text}</span>;
}

export {TimeAgo};
