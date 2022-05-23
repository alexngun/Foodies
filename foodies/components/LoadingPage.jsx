import { LoadingOutlined } from '@ant-design/icons';
import Brand from './Brand'
import { Result, Button, Spin } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 100, opacity: 0.6, color: 'green' }} spin />;

function LoadingPage({className=""}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
        <Brand size="lg" className="opacity-90 translate-y-20"/>
        <Result
        icon={<Spin indicator={antIcon}/>}
        title="Loading..."
        subTitle="Please wait for data to be fetched."
        />
  </div>
  )
}

export default LoadingPage