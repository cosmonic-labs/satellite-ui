import {type Duration, formatDuration as formatDurationDateFns} from 'date-fns';

/**
 * Format a date-fns duration object into a human readable string
 * @param duration the duration to format
 * @param options the options object
 * @param options.short whether to use short format i.e. 1d 2h 3m 4s or long format i.e. 1 day 2 hours 3 minutes 4 seconds
 * @param options.levels the number of levels to display. i.e. 1d 2h 3m 4s with levels=2 would display 1d 2h
 */
function formatDuration(
  duration: Duration,
  options?: {isShort?: boolean; levels?: 1 | 2 | 3 | 4 | 5 | 6 | 7},
): string {
  const {levels = 3, isShort = false} = options ?? {};
  const {years, months, weeks, days, hours, minutes} = duration;

  const start = years ? 0 : months ? 1 : weeks ? 2 : days ? 3 : hours ? 4 : minutes ? 5 : 6;
  const end = start + levels;
  const result = formatDurationDateFns(duration, {
    format: (
      ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'] as Array<keyof Duration>
    ).slice(start, end),
    delimiter: ' ',
  });

  return isShort
    ? result.replaceAll(
        /\s(year|month|week|day|hour|minute|second)s?/g,
        (match, unit: string) => unit[0]?.toLocaleLowerCase() ?? '',
      )
    : result;
}

export {formatDuration};
