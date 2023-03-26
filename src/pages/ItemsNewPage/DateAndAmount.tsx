import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { DatePicker } from '../../components/DatePicker'
import { time } from '../../lib/time'

type Props = {
  className?: string
}
export const DateAndAmount: React.FC<Props> = (props) => {
  const { className } = props
  const [date, setDate] = useState(new Date())
  const [output, _setOutput] = useState('0')
  // 拦截器
  const setOutput = (str: string) => {
    const dotIndex = str.indexOf('.')
    if (dotIndex >= 0 && str.length - dotIndex > 3) { return }
    if (str.length > 16) { return }
    _setOutput(str)
  }
  const { popup, toggle, hide } = usePopup(false, <DatePicker
    onCancel={() => hide()}
    onConfirm={d => { setDate(d); hide() }} />)
  const append = (char: string) => {
    switch (char) {
      case '0':
        if (output !== '0') { setOutput(output + char) }
        break
      case '.':
        if (output.indexOf('.') === -1) { setOutput(output + char) }
        break
      default:
        if (output === '0') { setOutput(char) }
        else { setOutput(output + char) }
        break
    }
  }
  const clear = () => {
    setOutput('0')
  }
  const remove = () => {
    const char = output.slice(0, -1)
    setOutput(char)
  }
  return (
    <>
      <div className={className}>
        <div flex p-t-15px p-b-16px px-16px border-t-1px border-t="#ddd" gap-x-8px items-center>
          <span flex gap-x-8px items-center onClick={toggle}>
            <Icon name="calendar" className='w-24px h-24px grow-0 shrink-0' />
            <span grow-0 shrink-0 color="#999">{time(date).format()}</span>
          </span>
          <code grow-1 shrink-1 text-right color="#53A867">{output}</code>
        </div>
        <div py-1px w="100%" grid gap-1px bg="#ddd"
          grid-cols="[repeat(4,1fr)]" grid-rows="[repeat(4,56px)]"
          children-b-none children-bg-white
        >
          <button row-start-1 col-start-1 row-end-2 col-end-2 onClick={() => append('1')}>1</button>
          <button row-start-1 col-start-2 row-end-2 col-end-3 onClick={() => append('2')}>2</button>
          <button row-start-1 col-start-3 row-end-2 col-end-4 onClick={() => append('3')}>3</button>
          <button row-start-2 col-start-1 row-end-3 col-end-2 onClick={() => append('4')}>4</button>
          <button row-start-2 col-start-2 row-end-3 col-end-3 onClick={() => append('5')}>5</button>
          <button row-start-2 col-start-3 row-end-3 col-end-4 onClick={() => append('6')}>6</button>
          <button row-start-3 col-start-1 row-end-4 col-end-2 onClick={() => append('7')}>7</button>
          <button row-start-3 col-start-2 row-end-4 col-end-3 onClick={() => append('8')}>8</button>
          <button row-start-3 col-start-3 row-end-4 col-end-4 onClick={() => append('9')}>9</button>
          <button row-start-4 col-start-1 row-end-5 col-end-3 onClick={() => append('0')}>0</button>
          <button row-start-4 col-start-3 row-end-5 col-end-4 onClick={() => append('.')}>.</button>
          <button row-start-1 col-start-4 row-end-2 col-end-5 flex items-center justify-center
            onClick={remove}>
            <Icon name="delete" className='w-36px h-36px grow-0 shrink-0'/>
          </button>
          <button row-start-2 col-start-4 row-end-3 col-end-5 onClick={clear}>清空</button>
          <button row-start-3 col-start-4 row-end-5 col-end-5
            bg="#5C33BE" text-white onClick={() => { }}>提交</button>
        </div>
      </div>
      {popup}
    </>
  )
}
