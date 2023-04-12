export const confirmable = (title: string, fn: () => void) => () => {
  const result = window.confirm(title)
  if (result) { fn() }
}
