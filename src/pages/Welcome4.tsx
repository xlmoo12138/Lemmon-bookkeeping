import { useNavigate } from 'react-router-dom'
import { useLocalStore } from '../stores/useLocalStore'
import welcome4Animation from '../assets/json/welcome4.json'
import { WelcomeAnimation } from '../components/WelcomeAnimation'

export const Welcome4: React.FC = () => {
  const { setHasReadWelcomes } = useLocalStore()
  const nav = useNavigate()
  const onSkip = () => {
    setHasReadWelcomes(true)
    nav('/home')
  }
  return (
    <div text-center>
      <WelcomeAnimation animationData={welcome4Animation} />
      <h2 text-32px mt-90px >
        云备份 <br />
        再也不怕数据丢失
      </h2>
      <div mt-64px>
        <span text-32px color="#af7de4" font-bold onClick={onSkip}>开启应用</span>
      </div>
    </div>
  )
}
export default Welcome4
