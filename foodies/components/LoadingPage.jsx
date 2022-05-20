import { LoadingOutlined } from '@ant-design/icons';
import Brand from './Brand'
import { Result, Button, Spin } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 100, opacity: 0.6, color: 'green' }} spin />;

function LoadingPage() {
  return (
    <div className='w-screen h-screen flex flex-col items-center'>
        <Brand size="lg" className="mt-[10%] opacity-90 translate-y-20"/>
        <Result
        icon={<Spin indicator={antIcon}/>}
        title="Loading..."
        subTitle="Please wait for data to be fetched."
        />
  </div>
  )
}

export default LoadingPage