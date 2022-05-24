import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { AiOutlineGoogle, AiOutlineGithub, AiOutlineFacebook } from 'react-icons/ai'
import { Result, Button, Alert } from 'antd'
import Brand from '../../components/Brand'
import LoadingPage from '../../components/LoadingPage'
import Back from '../../components/Back'
import { AnimatePresence, motion } from 'framer-motion'

function Signin() {

  const { data:session, status } = useSession()
  const { push, query } = useRouter()
  const [message, setMessage] = useState(false)
  
  useEffect(() => {
    if(query.error) {
      if(query.error === "OAuthAccountNotLinked") {
        setMessage({
            status: "error",
            title: "Sign in fail",
            des: "Account with the same email address is already registered! Please login to your original account."
        })
      }
      else if(query.error === "AuthRequired") {
        setMessage({
          status: "warning",
          title: "Login required",
          des: "Please log in first"
        })
      }
      else {
        setMessage({
          status: "error",
          title: "Sign in fail",
          des: "An error occured during login. Please try again"
        })
      }
    }

    if(query.pushCart && status !== "loading") {
      const cart = window.localStorage.getItem("cart")
      
      if(cart && Object.keys(cart).length > 2) {
        fetch("http://localhost:3000/api/pushToCart/", {
          method: "POST",
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json'},
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(cart)
        })
      }
      window.localStorage.setItem("cart", "{}")
    }
  }, [status])


  const handleLogin = async provider => {
    await signIn(provider, { callbackUrl: `/auth/signin?pushCart=true${query.callbackUrl?`&callbackUrl=${query.callbackUrl}`:""}`} )
  }
  
  if( status === 'loading') return (<LoadingPage/>)

  if (session) {
    setTimeout( () => {
      push(`${query.callbackUrl?query.callbackUrl:"/"}`)
    }, 3000)

    return (
      <div className='w-screen h-screen flex flex-col items-center'>
        <Brand size="lg" className="opacity-90 translate-y-20"/>
        <Result
          status="success"
          title="Login successfully"
          subTitle="Your browser will redirect you back shortly .If you are not redirected automatically, click the button below to return back to home page."
          extra={[
            <Button key="buy" onClick={()=>push('/')}>Back</Button>,
          ]}
        />
      </div>

    )
  }

  setTimeout( ()=> message && setMessage(false), 5000 )

  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <AnimatePresence>
        { message &&         
            <motion.span
              initial = { { y: -100} }
              animate ={ { y: 0} }
              exit={ { y: -100} }
              transition = {{type: "spring", stiffness: 250, damping: 20 }}
              className='z-10 fixed top-[10px] mx-auto shadow-lg'>
                  <Alert
                    message={message.title}
                    description={message.des}
                    type={message.status}
                    showIcon
                  />
            </motion.span>
        }
      </AnimatePresence>

      <Back className='mt-[10%]'/>
      <Brand size="lg" className="opacity-90 translate-y-5"/>
      <h1 className='text-[25px] font-bold text-green-700'> Welcome Back </h1>
      <ul className='space-y-4 mt-6'>
        <li className='flex items-center p-5 hover:cursor-pointer border-2 border-google text-google' 
            onClick={()=>handleLogin('google')}
          > 
          <AiOutlineGoogle className='text-2xl mr-2 '/> Sign in with Google 
        </li>
        <li className='flex items-center p-5 hover:cursor-pointer border-2 border-facebook text-facebook' 
            onClick={()=>handleLogin('facebook')}
          > 
          <AiOutlineFacebook className='text-2xl mr-2 '/> Sign in with Facebook
        </li>
        <li className='flex items-center p-5 hover:cursor-pointer border-2 border-github text-github'
            onClick={()=>handleLogin('github')}
          >
           <AiOutlineGithub className='text-2xl mr-2'/> Sign in with Github 
        </li>
      </ul>
      <div className='mt-[6%] text-gray-500/60 w-[90%] text-center'>
        Click “Sign In” to agree to Foodies's <span className='hover:cursor-pointer underline'>Terms of Service</span> and acknowledge that Foodies's <span className='hover:cursor-pointer underline'>Privacy Policy</span> applies to you.
      </div>
    </div>
  )
}


export default Signin