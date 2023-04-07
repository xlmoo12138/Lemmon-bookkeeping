import { Link, useNavigate } from 'react-router-dom'
import useSWRInfinite from 'swr/infinite'
import styled from 'styled-components'
import { Icon } from '../../components/Icon'
import { useAjax } from '../../lib/ajax'
import { LongPressable } from '../../components/LongPressable'

type Props = {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids: Item['tag_ids']) => void
}
const Div = styled.div`
  padding: 16px;
  text-align: center;
`

export const Tags: React.FC<Props> = (props) => {
  const { kind, value, onChange } = props
  const getKey = (pageIndex: number, prev: Resources<Item>) => {
    if (prev) {
      const sendCount = (prev.pager.page - 1) * prev.pager.per_page + prev.resources.length
      const count = prev.pager.count
      if (sendCount >= count) {
        return null
      }
    }
    return `/api/v1/tags?page=${pageIndex + 1}&kind=${kind}`
  }
  const { get } = useAjax({ showLoading: true, handleError: true })
  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    async path => (await get<Resources<Tag>>(path)).data,
    { revalidateFirstPage: true }
  )
  const onLoadMore = () => {
    setSize(size + 1)
  }
  const nav = useNavigate()
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore
  if (!data) {
    return <div></div>
  } else {
    const last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    const hasMore = (page - 1) * per_page + last.resources.length < count
    return (
      <div>
        <ol grid grid-cols="[repeat(auto-fit,48px)]" justify-center gap-x-32px
          gap-y-16px py-16px px-8px>
          <li>
            <Link to={`/tags/new?kind=${kind}`}>
              <span w-48px h-48px rounded='24px' bg="#EFEFEF"
                flex justify-center items-center text-24px text="#8F4CD7"
              ><Icon name="add" /></span>
            </Link>
          </li>
          {data.map(({ resources }, index) => {
            return resources.map((tag, index) =>
              <li key={index} onClick={() => { onChange?.([tag.id]) }} >
                <LongPressable className='w-48px flex justify-center items-center flex-col
                   gap-y-8px select-none' onEnd={() => { nav(`/tags/${tag.id}`) }}>
                  {value?.includes(tag.id)
                    ? <span w-48px h-48px rounded='24px' bg="#EFEFEF"
                      flex justify-center items-center text-24px b-1 b="#8F4CD7">{tag.sign}</span>
                    : <span w-48px h-48px rounded='24px' bg="#EFEFEF"
                      flex justify-center items-center text-24px b-1 b-transparent>{tag.sign}</span>
                  }
                    <span text-12px text="#666">{tag.name}</span>
                </LongPressable>
              </li>
            )
          })}
        </ol>
        {error && <Div>数据加载失败，请刷新页面</Div>}
        { !hasMore
          ? (page === 1 && last.resources.length === 0) ? <Div>点击加号，创建新标签</Div> : <Div>没有更多数据了</Div>
          : isLoading
            ? <Div>数据加载中...</Div>
            : <Div> <button j-btn onClick={onLoadMore}>加载更多</button> </Div>
        }
      </div>
    )
  }
}
