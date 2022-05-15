
function CheckoutButton({className}) {
  return (
    <button className={`${className?className:""} w-full bg-green-700 text-white py-2 rounded-sm border-green-400 hover:opacity-90`}>
        Check Out
    </button>
  )
}

export default CheckoutButton