import Head from '../components/Head'
import Page from '../components/PageLayout'
import Landing from '../components/Landing'

export default function Home() {

  return (
    <div className='min-h-screen h-fit flex flex-col'>
      <Head/>
      <Page>
        <Page.SingleWindow size="2xl"
          component={
            <Landing/>
          }
        />
      </Page>
    </div>
  )
}
