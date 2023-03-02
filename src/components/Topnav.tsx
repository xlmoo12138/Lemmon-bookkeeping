import { useContext } from 'react'
import { MenuContext } from '../contexts/MenuContext'
import { Icon } from './Icon'

interface Props {
  title?: string
}
export const TopNav: React.FC<Props> = ({ title = '柠萌记账' }) => {
  const { setVisiable } = useContext(MenuContext)
  return (
    <div text-white flex items-center px-24px pt-24px pb-8px >
      <Icon name="menu" className='w-24px h-24px mr-16px'
        onClick={() => setVisiable(true)}
      />
      <h1 text-24px >{title}</h1>
    </div>
  )
}
