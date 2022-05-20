import '../styles/globals.css'
import '../dist/output.css'
import 'antd/dist/antd.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
        <Provider store = {store}>
          <Component {...pageProps} />
        </Provider>
    </SessionProvider>

  )
}

export default MyApp
