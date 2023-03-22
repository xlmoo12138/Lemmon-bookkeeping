import { useState } from 'react'

type Props = {
  start?: Date
  end?: Date
  value?: Date
}
export const DatePicker: React.FC<Props> = (props) => {
  const { start, end, value } = props
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, setTranslateY] = useState(0)
  return (
    <div h="50vh" overflow-hidden relative
    onTouchStart={(e) => {
      setIsTouching(true)
      setLastY(e.touches[0].clientY)
    }}
    onTouchMove={(e) => {
      if (isTouching) {
        const y = e.touches[0].clientY
        const dy = y - lastY
        setTranslateY(translateY + dy)
        setLastY(y)
      }
    }}
    onTouchEnd={(e) => {
      const remainder = translateY % 36
      let y = translateY - remainder
      if (Math.abs(remainder) > 18) {
        y += 36 * (remainder > 0 ? 1 : -1)
      }
      setTranslateY(y)
      setIsTouching(false)
    }}
  >
    <div b-1 b-red h-36px absolute top="[calc(50%-18px)]" w-full />
    <div absolute top="[calc(50%-18px)]" w-full>
      <ol style={{ transform: `translateY(${translateY}px)` }}
        children-h-36px text-center children-leading-36px
      >
        <li>2001</li>
        <li>2002</li>
        <li>2003</li>
        <li>2004</li>
        <li>2005</li>
        <li>2006</li>
        <li>2007</li>
        <li>2008</li>
        <li>2009</li>
        <li>2010</li>
        <li>2001</li>
        <li>2002</li>
        <li>2003</li>
        <li>2004</li>
        <li>2005</li>
        <li>2006</li>
        <li>2007</li>
        <li>2008</li>
        <li>2009</li>
        <li>2010</li>
        <li>2007</li>
        <li>2008</li>
        <li>2009</li>
        <li>2010</li>
        <li>2001</li>
        <li>2002</li>
        <li>2003</li>
        <li>2004</li>
        <li>2005</li>
        <li>2006</li>
        <li>2007</li>
        <li>2008</li>
        <li>2009</li>
        <li>2010</li>
      </ol>
    </div>
  </div>
  )
}
