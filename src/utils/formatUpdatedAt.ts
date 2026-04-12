const formatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatUpdatedAt(timestamp: number): string {
  return formatter.format(new Date(timestamp))
}
