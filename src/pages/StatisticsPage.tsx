import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const items = [
    { date: '2000-1-1', value: 15000 },
    { date: '2000-1-3', value: 35000 },
    { date: '2000-1-4', value: 45000 },
    { date: '2000-1-5', value: 55000 },
    { date: '2000-1-6', value: 65000 },
    { date: '2000-1-7', value: 75000 },
    { date: '2000-1-8', value: 85000 },
    { date: '2000-1-9', value: 95000 },
    { date: '2000-1-10', value: 105000 },
    { date: '2000-1-11', value: 115000 },
    { date: '2000-1-12', value: 125000 },
    { date: '2000-1-31', value: 135000 }
  ].map(item => ({ x: item.date, y: item.value / 100 }))
  const items2 = [
    { tag: '吃饭', amount: 10000 },
    { tag: '打车', amount: 20000 },
    { tag: '零食', amount: 68800 }
  ].map(item => ({ x: item.tag, y: item.amount / 100 }))
  return (
    <div>
      <Gradient>
        <TopNav title="统计图表" icon={
          <Icon name="back" className="w-24px h-24px" />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      <LineChart className="h-120px" items={items} />
      <PieChart className='h-260px' items={items2} />
    </div>
  )
}
