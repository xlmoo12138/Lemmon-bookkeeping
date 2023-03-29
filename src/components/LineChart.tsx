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
  const initialized = useRef(false)
  useEffect(() => {
    if (!divRef.current) { return }
    if (initialized.current) { return }
    const myChart = echarts.init(divRef.current)
    initialized.current = true
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        show: true,
        formatter: ([{ axisValue, data }]: any) => {
          const parts = axisValue.split('-')
          const label = `${parts[0]}年${parts[1]}月${parts[2]}日`
          const value = data === null ? '无数据' : `${data}元`
          return `<div style="text-align: right;">${label}<br/>${value}</div>`
        }
      },
      grid: {
        top: 8,
        right: 16,
        bottom: 24,
        left: 16
      },
      xAxis: {
        type: 'category',
        data: xItems,
        axisLabel: {
          formatter: (label: string) => label.slice(label.indexOf('-') + 1)
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          data: yItems,
          type: 'line',
          emphasis: {
            itemStyle: {
              color: 'green'
            }
          }
        }
      ]
    }

    myChart.setOption(option)
  }, [])
  return (
    <div ref={divRef} className={className}></div>
  )
}
