type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}
export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, request } = props
  const onClick = async () => {
    if (!request) { return }
    await request()
    // 开始倒计时
  }
  return (
    <div flex gap-x-16px>
      <input max-w="[calc(40%-8px)]" j-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)}
      />
      <button type="button" max-w="[calc(60%-8px)]" j-btn onClick={onClick}>发送验证码</button>
    </div>
  )
}
