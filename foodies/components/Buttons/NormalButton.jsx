
function NormalButton({children, className="", onClick}) {
  return (
    <button className={`${className}  hover:cursor-pointer hover:opacity-90 bg-green-700 rounded-md text-white`}
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default NormalButton