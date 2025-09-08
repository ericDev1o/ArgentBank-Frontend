import Feature from '@/components/UI/Feature';
import Layout from '../components/containers/Layout';

export default function Home() {
    return <Layout>
        <main>
          <div className='hero position-relative'>
            <section className='
              hero-content 
              width-200px 
              width-300px-gt920pxmq 
              text-align-left 
              margin-0-auto 
              padding-2rem 
              position-relative'
            >
              <h2 className='sr-only padding-0'>Promoted Content</h2>
              <p className='subtitle margin-0 font-weight-bold font-size-1rem'>No fees.</p>
              <p className='subtitle margin-0 font-weight-bold font-size-1rem'>No minimum deposit.</p>
              <p className='subtitle margin-0 font-weight-bold font-size-1rem'>High interest rates.</p>
              <p className='text font-size-1dot2rem'>Open a savings account with Argent Bank today!</p>
            </section>
          </div>
          <section className='features display-flex flex-direction-column'>
            <h2 className='sr-only padding-0'>Features</h2>
            <Feature 
              imgSrc='/img/icon-chat.avif'
              iconType='chat icon'
              title='You are our #1 priority'
              paragraph='Need to talk to a representative? You can get in touch through our
                24/7 chat or through a phone call in less than 5 minutes.' 
            />
            <Feature
              imgSrc='/img/icon-money.avif'
              iconType='money icon'
              title='More savings means higher rates'
              paragraph='The more you save with us, the higher your interest rate will be!'
            />
            <Feature
              imgSrc='/img/icon-security.avif'
              iconType='security icon'
              title='Security you can trust'
              paragraph='We use top of the line encryption to make sure your data and money
                is always safe.'
            />
          </section>
        </main>
    </Layout>
}