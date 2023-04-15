import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export const AddItemFloatButton: React.FC = () => {
  return (
    <Link to='/items/new'>
      <button w-56px h-56px bg="#af7de4" b-none rounded="50%" text-white
        fixed bottom-16px right-16px flex justify-center items-center >
        <Icon name="add" className="w-48px h-48px" />
      </button>
    </Link>
  )
}
