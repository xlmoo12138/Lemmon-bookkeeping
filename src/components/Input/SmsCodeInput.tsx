import { useEffect, useRef, useState } from 'react'

type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}
const maxCount = 60
export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, request } = props
  const [started, setStarted] = useState<Date>()
  const [count, setCount] = useState(maxCount)
  const timer = useRef<number>()
  const onClick = async () => {
    if (!request) { return }
    await request()
    // 开始倒计时
    setStarted(new Date())
  }
  useEffect(() => {
    if (started) {
      timer.current = window.setInterval(() => {
        const t = new Date()
        const seconds = Math.round((t.getTime() - started.getTime()) / 1000)
        if (maxCount - seconds < 0) {
          setStarted(undefined)
        }
        setCount(maxCount - seconds)
      }, 1000)
    } else {
      if (timer.current) {
        window.clearInterval(timer.current)
        timer.current = undefined
      }
    }
    return () => {
      if (timer.current) {
        window.clearInterval(timer.current)
        timer.current = undefined
      }
    }
  }, [started])
  return (
    <div flex gap-x-16px>
      <input max-w="[calc(40%-8px)]" j-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)}
      />
      {started
        ? <button type="button" max-w="[calc(60%-8px)]" j-btn disabled text-gray>{count}</button>
        : <button type="button" max-w="[calc(60%-8px)]" j-btn onClick={onClick}>
          发送验证码
        </button>
      }
    </div>
  )
}
