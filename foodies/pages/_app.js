import '../styles/globals.css'
import '../dist/output.css'
import 'antd/dist/antd.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Provider } from 'react-redux'
import { store } from '../redux/store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store = {store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
