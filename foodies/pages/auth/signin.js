import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { AiOutlineGoogle, AiOutlineGithub, AiOutlineFacebook } from 'react-icons/ai'
import { Result, Button, Alert } from 'antd'
import Brand from '../../components/Brand'
import LoadingPage from '../../components/LoadingPage'
import Back from '../../components/Back'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function Signin() {

  const { data:session, status } = useSession()
  const { push, query } = useRouter()
  const [showError, setShowError] = useState(false);
  
  useEffect(() => {
    query.error && setShowError(true)
  }, [status])
  
  if( status === 'loading') return (<LoadingPage/>)
  
  if (session) {
    setTimeout( () => {
      push('/')
    }, 3000)

    return (
      <div className='w-screen h-screen flex flex-col items-center'>
        <Brand size="lg" className="mt-[10%] opacity-90 translate-y-20"/>
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

  setTimeout( ()=> showError && setShowError(false), 5000 )

  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <AnimatePresence>
        { showError &&         
            <motion.span
              initial = { { y: -100} }
              animate ={ { y: 0} }
              exit={ { y: -100} }
              transition = {{type: "spring", stiffness: 250, damping: 20 }}
              className='z-10 fixed top-[10px] mx-auto shadow-lg'>
                  <Alert
                    message="Sign in failed"
                    description={` ${query.error==="OAuthAccountNotLinked"?
                      "Account with the same email address is already registered! Please login to your original account.":
                      "An error occured during login. Please try again"}`}
                    type="error"
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
            onClick={()=>signIn('google')}
          > 
          <AiOutlineGoogle className='text-2xl mr-2 '/> Sign in with Google 
        </li>
        <li className='flex items-center p-5 hover:cursor-pointer border-2 border-facebook text-facebook' 
            onClick={()=>signIn('facebook')}
          > 
          <AiOutlineFacebook className='text-2xl mr-2 '/> Sign in with Facebook
        </li>
        <li className='flex items-center p-5 hover:cursor-pointer border-2 border-github text-github'
            onClick={()=>signIn('github')}
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