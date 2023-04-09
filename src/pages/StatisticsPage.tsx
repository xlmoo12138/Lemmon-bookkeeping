import { useState } from 'react'
import useSWR from 'swr'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'
import type { Time } from '../lib/time'
import { useAjax } from '../lib/ajax'
import { timeRangeToStartAndEnd } from '../lib/timeRangeToStartAndEnd'

type Groups = { happen_at: string; amount: number }[]
type Groups2 = { tag_id: number; tag: Tag; amount: number }[]
const format = 'yyyy-MM-dd'
type GetKeyParams = {
  start: Time
  end: Time
  kind: Item['kind']
  group_by: 'happen_at' | 'tag_id'
}
const getKey = ({ start, end, kind, group_by }: GetKeyParams) => {
  return `/api/v1/items/summary?happened_after=${start.format(format)}&happened_before=${end.format(format)}&kind=${kind}&group_by=${group_by}`
}
export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState<Item['kind']>('expenses')
  const { get } = useAjax({ showLoading: false, handleError: true })

  const generateDefaultItems = (time: Time) => {
    return Array.from({ length: start.dayCountOfMonth }).map((_, i) => {
      const x = start.clone.add(i, 'day').format(format)
      return { x, y: 0 }
    })
  }
  const { start, end } = timeRangeToStartAndEnd(timeRange)
  const defaultItems = generateDefaultItems(start)
  const { data: items } = useSWR(getKey({ start, end, kind, group_by: 'happen_at' }),
    async (path) =>
      (await get<{ groups: Groups; total: number }>(path)).data.groups
        .map(({ happen_at, amount }) => ({ x: happen_at, y: (amount / 100).toFixed(2) }))
  )
  const normalizedItems = defaultItems?.map((defaultItem, index) =>
    items?.find((item) => item.x === defaultItem.x) || defaultItem
  )
  const { data: items2 } = useSWR(getKey({ start, end, kind, group_by: 'tag_id' }),
    async (path) =>
      (await get<{ groups: Groups2; total: number }>(path)).data.groups
        .map(({ tag_id, tag, amount }) =>
          ({ name: tag.name, value: parseFloat((amount / 100).toFixed(2)), sign: tag.sign }))
  )
  // const items3 = [
  //   { tag: { name: '吃饭', sign: '😁' }, amount: 10000 },
  //   { tag: { name: '打车', sign: '🤬' }, amount: 20000 },
  //   { tag: { name: '零食', sign: '🤡' }, amount: 68800 }
  // ].map(item => ({ name: item.tag.name, value: item.amount, sign: item.tag.sign }))
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
          ]} value={kind} onChange={(value) => setKind(value as Item['kind'])} disableError/>
        </div>
      </div>
      <LineChart className="h-120px" items={normalizedItems} />
      <PieChart className='h-260px m-t-16px' items={items2} />
      <RankChart className='m-t-8px' items={items2}/>
    </div>
  )
}
