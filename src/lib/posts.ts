const postDateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export function formatPostDate(date: string): string {
  return postDateFormatter.format(new Date(`${date}T00:00:00Z`));
}
