import c from 'classnames'
interface Props {
  name: string
  className?: string
}

export const Iocn: React.FC<Props> = ({ name, className }) => {
  return (
    <svg className={c(className, 'j-icon')}>
      <use xlinkHref={`#${name}`}></use>
    </svg >
  )
}
