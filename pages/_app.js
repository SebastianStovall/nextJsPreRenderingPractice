// _app.js represents your root component. all components from the pages folder are proped in from the root so they can be displayed


// if you want a default head tag to be read my screen readers, add it to this file and wrap with with all components
// next.js will merge the head data you have set up in other files, so next.js will take the latest meta tag element for that head content if theres a conflict
import Head from 'next/head'

import Layout from '../components/layout/layout'
import '../styles/globals.css'

// so basically Layout component is specifiying that we want a header component ON TOP of our MAIN PAGE CONTENT (see <Layout /> code),
// and thats acheived by rendering props.children under the <MainHeader/> component... props.children represents the content in between the Layout tags (<Layout> ... </Layout>),
// in this case, it happens to be ----> <Component {...pageProps} /> component, which IS all the main page content

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        {/* insert generic head data here */}
        <meta name='viewport' content='intiial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
