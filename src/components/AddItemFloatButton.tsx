import { Iocn } from './Icon'

export const AddItemFloatButton: React.FC = () => {
  return (
    <button w-56px h-56px bg="#5C33BE" b-none rounded="50%" text-white
       fixed bottom-16px right-16px flex justify-center items-center >
      <Iocn name="add" className="w-48px h-48px" />
    </button>
  )
}
