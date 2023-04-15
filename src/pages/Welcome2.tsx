import { Link } from 'react-router-dom'
import welcome2Animation from '../assets/json/welcome2.json'
import { WelcomeAnimation } from '../components/WelcomeAnimation'
export const Welcome2: React.FC = () => {
  return (
    <div text-center>
      <WelcomeAnimation animationData={welcome2Animation} />
      <h2 text-32px mt-48px >
        每日提醒 <br />
        不会遗漏每一笔账单
      </h2>
      <div mt-64px>
        <Link text-32px color="#af7de4" font-bold to="/welcome/3">下一页</Link>
      </div>
    </div>
  )
}
export default Welcome2
