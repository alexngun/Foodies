
function NormalButton({children, className="", onClick}) {
  return (
    <button className={`${className} flex items-center hover:cursor-pointer hover:opacity-90 bg-green-700 text-lg rounded-md text-white`}
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default NormalButton