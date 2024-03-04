import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const ServerDateTime = ({
  cityTimezone,
  timeFormat = 'dddd, MMMM D, YYYY h:mm:ss A',
  date,
}: {
  cityTimezone: string;
  timeFormat?: string;
  date?: string;
}) => {
  return <div>{dayjs(date).tz(cityTimezone).format(timeFormat)}</div>;
};

export default ServerDateTime;
