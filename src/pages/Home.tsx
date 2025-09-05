import Feature from '@/components/UI/Feature';
import Layout from '../components/containers/Layout';

export default function Home() {
    return <Layout logIn={true}>
        <main>
          <div className='hero'>
            <section className='hero-content'>
              <h2 className='sr-only'>Promoted Content</h2>
              <p className='subtitle'>No fees.</p>
              <p className='subtitle'>No minimum deposit.</p>
              <p className='subtitle'>High interest rates.</p>
              <p className='text'>Open a savings account with Argent Bank today!</p>
            </section>
          </div>
          <section className='features'>
            <h2 className='sr-only'>Features</h2>
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