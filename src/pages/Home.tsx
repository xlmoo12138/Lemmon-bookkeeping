import useSWR from 'swr'
import { Link, Navigate } from 'react-router-dom'
import { useAjax } from '../lib/ajax'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import homeAnimation from '../assets/json/home.json'
import { WelcomeAnimation } from '../components/WelcomeAnimation'

export const Home: React.FC = () => {
  const { get } = useAjax({ showLoading: true, handleError: false })
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path => {
    // 如果 返回 401 就让用户先登录
    const response = await get<Resource<User>>(path)
    return (response).data.resource
  }
  )
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await get<Resources<Item>>(path)).data
  )

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItems) {
    return (
      <div flex justify-center items-center h-screen>
        <div text-center p-16px>正在加载页面，请稍等</div>
      </div>
    )
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }

  // window.console.log(meData, meError, itemsData, itemsError)
  return (
    <div>
      <div flex justify-center>
      <WelcomeAnimation className='mt-20vh mb-5vh' animationData={homeAnimation} />
      </div>
      <div px-16px>
        <Link to='/items/new'>
          <button j-btn>开始记账</button>
        </Link>
      </div>
      <AddItemFloatButton />
    </div>
  )
}

export default Home
