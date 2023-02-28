import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import p from '../assets/images/pig.svg'
import add from '../assets/icons/add.svg'
import { ajax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'

interface Props {
  title: string
}
export const Home: React.FC<Props> = (props) => {
  useTitle(props.title)
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path =>
    (await ajax.get<Resource<User>>(path)).data.resource
  )
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await ajax.get<Resources<Item>>(path)).data
  )

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItems) {
    return <div>加载中.....</div>
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items"/>
  }

  window.console.log(meData, meError, itemsData, itemsError)
  return (
    <div>
      <div flex justify-center>
        <img mt-20vh mb-20vh w-128px h-130px src={p} />
      </div>
      <div px-16px>
        <button h-48px w="100%" bg="#5C33BE" b-none text-white
          rounded-8px
        >开始记账</button>
      </div>
      <button p-4px w-56px h-56px bg="#5C33BE" b-none rounded="50%"
        fixed bottom-16px right-16px
      >
        <img max-w="100%" max-h="100%" src={add} />
      </button>
    </div>
  )
}
