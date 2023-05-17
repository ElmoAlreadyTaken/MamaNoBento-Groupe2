import OutlineUserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon.js'

export default function LoggedOut(){
  const onClickLogin = async (e) => {
    
  }
  return (
    <button
      className="flex gap-2 [&_svg]:h-6 [&_svg]:w-6"
      onClick={onClickLogin}
    >
      <OutlineUserCircleIcon />
    </button>
  )
}
