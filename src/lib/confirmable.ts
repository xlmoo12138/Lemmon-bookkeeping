export const confirmable = (fn: () => void) => () => {
  const result = window.confirm('确定要删除吗？')
  if (result) { fn() }
}
