import { formatDistanceToNowStrict } from 'date-fns';

export const formattedDateToString: (date: Date) => string = (date) => {
    return new Date().getTime() - date.getTime() < 1209600000 // 2 weeks in milliseconds
      ? `${formatDistanceToNowStrict(date)} ago`
      : new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(date);
  };
