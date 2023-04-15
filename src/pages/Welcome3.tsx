import { Link } from 'react-router-dom'
import welcome3Animation from '../assets/json/welcome3.json'
import { WelcomeAnimation } from '../components/WelcomeAnimation'

export const Welcome3: React.FC = () => {
  return (
    <div text-center>
        <WelcomeAnimation animationData={welcome3Animation} />
      <h2 text-32px mt-90px >
        数据可视化 <br />
        收支一目了然
      </h2>
      <div mt-64px>
        <Link text-32px color="#af7de4" font-bold to="/welcome/4">下一页</Link>
      </div>
    </div>
  )
}
export default Welcome3
