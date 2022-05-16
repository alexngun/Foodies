import Head from '../components/Head'
import Page from '../components/PageLayout'
import Landing from '../components/Landing'
import { Carousel } from 'antd'
import NormalButton from '../components/Buttons/NormalButton'
import ProductCards from '../components/ProductDisplay/ProductCards'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

  return (
    <div className='min-h-screen h-fit flex flex-col'>
      <Head/>
      <Page>

        {/* Landing Section */}
        <Page.SingleWindow size="2xl"
          component={
            <Landing/>
          }
        />
        {/* How It Works Section */}
        <Page.SingleWindow size="lg" className="bg-green-700 lg:rounded-lg"
          title="How It Works"
          titleColor='text-white'
          des="Freshly cooked and deliever to your front door!"
          center
          component={
            <div className='grid grid-rows-4 grid-cols-1 lg:grid-rows-1 lg:grid-cols-4 sm:grid-rows-2 sm:grid-cols-2 grow'>
              <div className='h-full flex flex-col justify-center items-center py-5'>
                <div className='bg-white p-8 rounded-[45%]'>
                  <img className='w-[180px] h-[200px] object-contain' loading='lazy' src="/img/others/shop.svg" />
                </div>
                <div className='text-lg text-white mt-2 font-bold'> Pick your meals online </div>
              </div>
              <div className='h-full flex flex-col justify-center items-center'>
                <div className='bg-white p-8 rounded-[45%]'>
                  <img className='w-[180px] h-[200px] object-contain' loading='lazy' src="/img/others/cook.svg" />
                </div>
                <div className='text-lg text-white mt-2 font-bold'> Meals cooked by chef </div>
              </div>
              <div className='h-full flex flex-col justify-center items-center'>
                <div className='bg-white p-8 rounded-[45%]'>
                  <img className='w-[180px] h-[200px] object-contain' loading='lazy' src="/img/others/deliver.svg" />
                </div>
                <div className='text-lg text-white mt-2 font-bold'> Instant shipment to your address</div>
              </div>
              <div className='h-full flex flex-col justify-center items-center'>
                <div className='bg-white p-8 rounded-[45%]'>
                  <img className='w-[180px] h-[200px] object-contain' loading='lazy' src="/img/others/arrived.svg" />
                </div>
                <div className='text-lg text-white mt-2 font-bold'> Orders delivered </div>
              </div>

            </div>
          }
        />
        {/* Banner Section */}
        <Page.SingleWindow size="lg" className="mt-16"
          component={
            <div className='relative w-full h-[450px]'>
                <div className='z-[5] absolute w-full h-[450px] bg-white/[.65] top-0 left-0'>
                  <div className='relative pt-[10%] px-6'>
                    <div className='text-green-700 font-bold text-[45px]'> 
                      Flexible plans that fit your <span className='text-[55px] text-sky-700'>life</span>
                    </div>
                    <div className='top-10 text-[18px] text-green-700/90 w-full md:3/5'>
                      We offer anywhere from 4–12 meals per week, with meals as low as $8.99 each.
                    </div>
                    <NormalButton className='py-2 mt-5 text-[18px] w-[200px]' onClick={()=>router.push("/plans")}>
                      See Details
                    </NormalButton>
                  </div>
                </div>
                <Carousel autoplay>
                  <div className='w-full h-fit'>
                    <img loading='lazy' className='w-full h-[450px] object-cover' src="/img/web/eatfresh.jpg"/>
                  </div>
                  <div className='w-full h-fit'>
                    <img loading='lazy' className='w-full h-[450px] object-cover' src="/img/web/health.jpg"/>
                  </div>
                  <div className='w-full h-fit'>
                    <img loading='lazy' className='w-full h-[450px] object-cover' src="/img/web/menmo.jpg"/>
                  </div>
                  <div className='w-full h-fit'>
                    <img loading='lazy' className='w-full h-[450px] object-cover' src="/img/web/yogurt.jpg"/>
                  </div>
                </Carousel>
            </div>

          }
        />
        {/* Intro Section */}
        <Page.DualWindow size="lg" className="mt-16"
          component1={
            <div className='w-full h-full flex items-center justify-center overflow-x-hidden'>
              <ProductCards/>
            </div>
          }
          component2={
            <NormalButton className='py-2 mt-5 text-[18px] w-[200px] mx-auto' onClick={()=>router.push("/menu")}>
              Shop Now
            </NormalButton>
          }
          title2="We believe eating right should be easy for everyone."
          des2="Each Foodies meal is perfectly sized for 1 person to enjoy at 1 sitting. Our fully-prepared meals are delivered fresh, and ready to eat in 3 minutes."
          center
          alcenter
        />
      </Page>
    </div>
  )
}
