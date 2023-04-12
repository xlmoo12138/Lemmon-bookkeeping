import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import { hasError, validate } from '../lib/validate'
import { useAjax } from '../lib/ajax'
import { BackIcon } from '../components/BackIcon'
import { time } from '../lib/time'
import s from './ItemsNewPage.module.scss'
import { ItemAmount } from './ItemsNewPage/ItemAmount'
import { Tags } from './ItemsNewPage/Tags'
import { ItemDate } from './ItemsNewPage/ItemDate'

export const ItemsNewPage: React.FC = () => {
  const { data, setData, setError } = useCreateItemStore()
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    {
      key: 'expenses', text: '支出', element: <Tags kind='expenses'
        value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
    },
    {
      key: 'income', text: '收入', element: <Tags kind='income'
        value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
    }
  ]
  const { post } = useAjax({ showLoading: true, handleError: true })
  const nav = useNavigate()
  const onSubmit = async () => {
    const error = validate(data, [
      { key: 'kind', type: 'required', message: '请选择类型：收入或支出' },
      { key: 'tag_ids', type: 'required', message: '请选择一个标签' },
      { key: 'happen_at', type: 'required', message: '请选择一个时间' },
      { key: 'amount', type: 'required', message: '请输入金额' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0' },
    ])
    setError(error)
    if (hasError(error)) {
      const message = Object.values(error).flat().join('\n')
      alert(message)
    } else {
      await post<Resource<Item>>('/api/v1/items', data)
      setData({ amount: 0, happen_at: time().isoString })
      nav('/items')
    }
  }
  return (
    <div className={s.wrapper} h-screen flex flex-col >
      <Gradient className="grow-0 shrink-0">
        <TopNav title="记一笔" icon={<BackIcon />} />
      </Gradient>
      <Tabs tabItems={tabItems} className='text-center grow-1 shrink-1 overflow-hidden'
        value={data.kind!} classPrefix='itemsNewPage'
        onChange={kind => setData({ kind })} />
      {/* <div>{ JSON.stringify(data)}</div> */}
      <ItemAmount className="grow-0 shrink-0" itemDate=
        {<ItemDate value={data.happen_at} onChange={(happen_at) => setData({ happen_at })} />}
        value={data.amount} onChange={(amount) => { setData({ amount }) }}
        onSubmit={onSubmit} />
    </div>
  )
}
