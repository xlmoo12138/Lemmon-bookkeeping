import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

type Props = {
  className?: string
  items?: { x: number | string; y: number }[]
}
export const LineChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const divRef = useRef<HTMLDivElement>(null)
  const xItems = items?.map(item => item.x)
  const yItems = items?.map(item => item.y)
  useEffect(() => {
    if (!divRef.current) { return }
    const myChart = echarts.init(divRef.current)
    const option = {
      xAxis: {
        type: 'category',
        data: xItems
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yItems,
          type: 'line'
        }
      ]
    }

    myChart.setOption(option)
  }, [])
  return (
    <div ref={divRef} className={className}></div>
  )
}
