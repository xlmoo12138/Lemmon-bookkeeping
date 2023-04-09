import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

type Props = {
  className?: string
  items?: { name: number | string; value: number }[]
}
export const PieChart: React.FC<Props> = (props) => {
  const { className, items = [] } = props
  const divRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  const myChart = useRef<echarts.ECharts>()
  useEffect(() => {
    if (!divRef.current) { return }
    // 初始化 echarts
    if (initialized.current) { return }
    myChart.current = echarts.init(divRef.current)
    initialized.current = true
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: ({ data: { name, value, sign } }: any) => {
          return `${sign} ${name}: ${value}元`
        }
      },
      grid: { left: 0, top: 0, right: 0, bottom: 0 },
      series: [
        {
          type: 'pie',
          radius: '90%',
          data: items,
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
    myChart.current.setOption(option)
  }, [])
  useEffect(() => {
    const option: echarts.EChartsOption = {
      series: [{
        data: items
      }]
    }
    myChart.current?.setOption(option)
  }, [items])
  return (
    <div ref={divRef} className={className}>PieChart </div>
  )
}
