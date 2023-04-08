import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [x, setX] = useState('expenses')
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
    { tag: { name: '吃饭', sign: '😁' }, amount: 10000 },
    { tag: { name: '打车', sign: '🤬' }, amount: 20000 },
    { tag: { name: '零食', sign: '🤡' }, amount: 68800 }
  ].map(item => ({ x: item.tag.name, y: item.amount / 100 }))
  const items3 = [
    { tag: { name: '吃饭', sign: '😁' }, amount: 10000 },
    { tag: { name: '打车', sign: '🤬' }, amount: 20000 },
    { tag: { name: '零食', sign: '🤡' }, amount: 68800 }
  ].map(item => ({ name: item.tag.name, value: item.amount, sign: item.tag.sign }))
  return (
    <div>
      <Gradient>
        <TopNav title="统计图表" icon={
          <Icon name="back" className="w-24px h-24px" />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange}
        timeRanges={[
          { key: 'thisMonth', text: '本月' },
          { key: 'lastMonth', text: '上月' },
          { key: 'twoMonthsAgo', text: '两个月前' },
          { key: 'threeMonthsAgo', text: '三个月前' },
        ]} />
      <div flex p-16px items-center gap-x-16px >
        <span grow-0 shrink-0>类型</span>
        <div grow-1 shrink-1>
          <Input type="select" options={[
            { text: '支出', value: 'expenses' },
            { text: '收入', value: 'income' },
          ]} value={x} onChange={(value) => setX(value)} disableError/>
        </div>
      </div>
      <div>{timeRange}</div>
      <LineChart className="h-120px" items={items} />
      <PieChart className='h-260px m-t-16px' items={items2} />
      <RankChart className='m-t-8px' items={items3}/>
    </div>
  )
}
