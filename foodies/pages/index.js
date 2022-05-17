import Head from '../components/Head'
import Page from '../components/PageLayout'
import Landing from '../components/Landing'
import { Carousel } from 'antd'
import NormalButton from '../components/Buttons/NormalButton'
import ProductCards from '../components/ProductDisplay/ProductCards'
import CommentSlider from '../components/Silder/commentSlider'
import Image from 'next/image'

import { useRouter } from 'next/router'

import Footer from '../components/Footer'

export default function Home( {commentsFeed} ) {

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
        <Page.SingleWindow size="lg" className="lg:rounded-lg"
          title="How It Works?"
          titleColor='text-green-700'
          des="Freshly cooked and deliever to your front door!"
          center
          component={
            <div className='grid grid-rows-4 grid-cols-1 lg:grid-rows-1 lg:grid-cols-4 sm:grid-rows-2 sm:grid-cols-2 grow'>
              <div className='h-full flex flex-col justify-center items-center py-5'>
                <div className='bg-white p-8 rounded-full'>
                  <img className='w-[180px] h-[200px] object-contain' loading='lazy' src="/img/others/shop.svg" />
                </div>
                <div className='text-lg text-green-700 mt-2 font-bold'> Pick your meals online </div>
              </div>
              <div className='h-full flex flex-col justify-center items-center'>
                <div className='bg-white p-8 rounded-full'>
                  <img className='w-[180px] h-[200px] object-contain' loading='lazy' src="/img/others/cook.svg" />
                </div>
                <div className='text-lg text-green-700 mt-2 font-bold'> Meals cooked by chef </div>
              </div>
              <div className='h-full flex flex-col justify-center items-center'>
                <div className='bg-white p-8 rounded-full'>
                  <img className='w-[180px] h-[200px] object-contain' loading='lazy' src="/img/others/deliver.svg" />
                </div>
                <div className='text-lg text-green-700 mt-2 font-bold'> Instant shipment to your address</div>
              </div>
              <div className='h-full flex flex-col justify-center items-center'>
                <div className='bg-white p-8 rounded-full'>
                  <img className='w-[180px] h-[200px] object-contain' loading='lazy' src="/img/others/arrived.svg" />
                </div>
                <div className='text-lg text-green-700 mt-2 font-bold'> Orders delivered </div>
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
        {/* Comments */}
        <Page.SingleWindow size="lg" className="mt-16 "
          title="What Others Are Saying?"
          center
          titleColor='text-green-700'
          component={
            <CommentSlider commentsFeed={commentsFeed}/>
          } 
        />
        {/* Sponsors */}
        <Page.SingleWindow size="sm" className="mt-16"
          component={
            <div className='grid px-5 h-full w-full bg-gray-200 grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2  lg:grid-cols-6 lg:grid-rows-1 py-[100px]'>
              <div className='h-[90px] w-full relative flex items-center justify-center'>
                <Image src='/img/web/sponsor1.svg'
                      objectFit='contain' height={60} width={215}
                />
              </div>
              <div className='h-[90px] w-full relative flex items-center justify-center -translate-x-3'>
                <Image src='/img/web/sponsor2.svg'
                      objectFit='contain' height={40} width={215}
                />
              </div>
              <div className='h-[90px] w-full relative flex items-center justify-center -translate-x-3'>
                <Image src='/img/web/sponsor3.svg'
                      objectFit='contain' height={40} width={215}
                />
              </div>
              <div className='h-[90px] w-full relative flex items-center justify-center'>
                <Image src='/img/web/sponsor4.svg'
                      objectFit='contain' height={40} width={180}
                />
              </div>
              <div className='h-[90px] w-full relative flex items-center justify-center translate-x-2'>
                <Image src='/img/web/sponsor5.svg'
                      objectFit='contain' height={40} width={170}
                />
              </div>
              <div className='h-[90px] w-full relative flex items-center justify-center'>
                <Image src='/img/web/sponsor6.svg'
                      objectFit='contain' height={40} width={215}
                />
              </div>
            </div>}
        />
      </Page>
      <Footer/>
    </div>
  )
}

export async function getStaticProps() {

  const commentsFeed = [
      {avatar: 'avatar-1.jpg', name: 'Dave', title: 'Foodies has changed our lives!', des: 'With Foodies, we don’t have to go anywhere or wait for delivery, and our monthly food bill has been cut nearly in half. We love it.'},
      {avatar: 'avatar-2.jpg', name: 'Sheri', title: '10 stars! Awesome! Love it!', des: 'We love Foodies because it takes two minutes to prepare, the food is great and we don’t have to spend time cleaning up.'},
      {avatar: 'avatar-3.jpg', name: 'William', title: 'One of the easiest decisions I\'ve made', des: 'With Foodies, I don’t have to think about what I’m going to eat for lunch each day and feel good knowing that I’m eating a healthy meal. I love the convenience!'},
      {avatar: 'avatar-4.jpg', name: 'Jeffrey', title: 'Amazingly delicious and convenient!', des: 'I love that I have found freshly and that it allows me to try new things and allows me to eat healthy while remaining affordable!'},
      {avatar: 'avatar-5.jpg', name: 'Jessica', title: 'Convenience, taste, variety', des: 'Been a customer for more than a year now, and love it. Customer service is particularly outstanding — whenever there’s been a problem, Foodies staff respond quickly and always rectify the problem.'},
      {avatar: 'avatar-6.jpg', name: 'Nathan', title: 'Delicious! So yummy!', des: 'The convenience of a well prepared, healthy, flavorful meal with no shopping, preparing, or clean up is simply amazing. Looking forward to the rest of the week.'},
  ]

  return {
      props: {
          commentsFeed
      }
  }
}