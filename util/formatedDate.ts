import { format, isToday, isYesterday, subDays, isAfter } from 'date-fns';

export function formatEmailDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  if (isToday(date)) {
    return `Today ${format(date, 'h:mm aa')}`;
  } 
  
  if (isYesterday(date)) {
    return `Yesterday ${format(date, 'h:mm aa')}`;
  } 
  
  // If within the last 7 days
  if (isAfter(date, subDays(new Date(), 7))) {
    return format(date, 'EEEE h:mm aa');
  } 

  // Older than a week
  return format(date, "EEEE do MMM, yyyy");
}