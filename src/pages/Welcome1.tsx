import { Link } from 'react-router-dom'
import welcome1Animation from '../assets/json/welcome1.json'
import { WelcomeAnimation } from '../components/WelcomeAnimation'
export const Welcome1: React.FC = () => {
  return (
    <div text-center>
      <WelcomeAnimation animationData={welcome1Animation} />
      <h2 text-32px mt-48px>
        会挣钱 <br/>
        还会省钱
      </h2>
      <div mt-64px>
        <Link text-32px color="#af7de4" font-bold to="/welcome/2">下一页</Link>
      </div>
    </div>
  )
}
export default Welcome1
