import { useState } from 'react'
import { DatePicker } from '../../components/DatePicker'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'

export const ItemDate: React.FC = () => {
  const [date, setDate] = useState(new Date())
  const { popup, toggle, hide } = usePopup({
    children: <DatePicker
    onCancel={() => hide()}
    onConfirm={d => { setDate(d); hide() }} />
  })
  return (
    <>
      {popup}
      <span flex gap-x-8px items-center onClick={toggle}>
        <Icon name="calendar" className='w-24px h-24px grow-0 shrink-0' />
        <span grow-0 shrink-0 color="#999">{time(date).format()}</span>
      </span>
    </>
  )
}
