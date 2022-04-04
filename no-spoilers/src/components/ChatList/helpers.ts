export function prettifyDate(date: Date) {
  // Returns the date in hh:mm am/pm format
  const options: {
    hour: any;
    minute: any;
  } = { hour: '2-digit', minute: '2-digit' };
  return date.toLocaleTimeString('en-US', options);
}
