type Props = {
  value?: number
}
export const Money: React.FC<Props> = (props) => {
  const { value = 0 } = props
  return (
    <span>¥{ value / 100 }</span>
  )
}
