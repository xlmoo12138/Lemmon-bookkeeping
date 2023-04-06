import { DatePicker } from '../../components/DatePicker'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'

type Props = {
  value?: string | Date
  onChange?: (date: string) => void
}
export const ItemDate: React.FC<Props> = (props) => {
  const { value, onChange } = props
  const { popup, toggle, hide } = usePopup({
    children: <DatePicker
    onCancel={() => hide()}
    onConfirm={d => { onChange?.(time(d).isoString); hide() }} />
  })
  return (
    <>
      {popup}
      <span flex gap-x-8px items-center onClick={toggle}>
        <Icon name="calendar" className='w-24px h-24px grow-0 shrink-0' />
        <span grow-0 shrink-0 color="#999">{time(value).format()}</span>
      </span>
    </>
  )
}
