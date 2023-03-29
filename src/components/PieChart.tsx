import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

type Props = {
  className?: string
  items?: { x: number | string; y: number }[]
}
export const PieChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const divRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  useEffect(() => {
    if (!divRef.current) { return }
    // 初始化 echarts
    if (initialized.current) { return }
    const myChart = echarts.init(divRef.current)
    initialized.current = true
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      series: [
        {
          type: 'pie',
          radius: '90%',
          data: items?.map(item => ({ value: item.y, name: item.x })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myChart.setOption(option)
  }, [])
  return (
    <div ref={divRef} className={className}>PieChart </div>
  )
}
