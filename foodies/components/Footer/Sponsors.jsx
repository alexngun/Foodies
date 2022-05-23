import Image from 'next/image'
import Page from '../PageLayout'

function Sponsors() {
  return (
      <div className='mt-16 grid px-5 h-full w-full bg-gray-200/50 grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2  lg:grid-cols-6 lg:grid-rows-1 py-[100px]'>
        <div className='h-[90px] w-full relative flex items-center justify-center'>
          <Image src='/img/web/sponsor1.svg' quality={2}
                objectFit='contain' height={60} width={215}
          />
        </div>
        <div className='h-[90px] w-full relative flex items-center justify-center -translate-x-3'>
          <Image src='/img/web/sponsor2.svg' quality={2}
                objectFit='contain' height={40} width={215}
          />
        </div>
        <div className='h-[90px] w-full relative flex items-center justify-center -translate-x-3'>
          <Image src='/img/web/sponsor3.svg' quality={2}
                objectFit='contain' height={40} width={215}
          />
        </div>
        <div className='h-[90px] w-full relative flex items-center justify-center'>
          <Image src='/img/web/sponsor4.svg' quality={2}
                objectFit='contain' height={40} width={180}
          />
        </div>
        <div className='h-[90px] w-full relative flex items-center justify-center translate-x-2'>
          <Image src='/img/web/sponsor5.svg' quality={2}
                objectFit='contain' height={40} width={170}
          />
        </div>
        <div className='h-[90px] w-full relative flex items-center justify-center'>
          <Image src='/img/web/sponsor6.svg' quality={2}
                objectFit='contain' height={40} width={215}
          />
        </div>
      </div>
  )
}

export default Sponsors