import add from '../assets/icons/add.svg'

export const AddItemFloatButton: React.FC = () => {
  return (
    <button p-4px w-56px h-56px bg="#5C33BE" b-none rounded="50%"
      text-6xl fixed bottom-16px right-16px
    >
      <img max-w="100%" max-h="100%" src={add} />
    </button>
  )
}
