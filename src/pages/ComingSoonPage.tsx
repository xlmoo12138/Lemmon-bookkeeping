import { useNavigate } from 'react-router-dom'
import comingSoonAnimation from '../assets/json/comingSoon.json'
import { WelcomeAnimation } from '../components/WelcomeAnimation'
export const ComingSoonPage: React.FC = () => {
  const nav = useNavigate()
  return (
    <div flex justify-center items-center flex-col gap-y-24px py-48px h-screen px-48px>
      <WelcomeAnimation animationData={comingSoonAnimation} />
      <h2>敬请期待~</h2>
      <button j-btn onClick={() => nav(-1)}>返回</button>
    </div>
  )
}
export default ComingSoonPage
