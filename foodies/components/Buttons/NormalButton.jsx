
function NormalButton({children, className="", onClick, bgColor="bg-green-700"}) {
  return (
    <button className={`flex items-center hover:cursor-pointer hover:opacity-90 ${bgColor} rounded-md text-white ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default NormalButton