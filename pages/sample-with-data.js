import fetch from 'isomorphic-fetch'
import Head from 'next/head'
import { getAPIUrl } from '../lib/utils/dataHelpers'
import PageTemplate from '../lib/components/PageTemplate'

const SampleWithData = ({ data }) =>
  <PageTemplate>
    <Head>
      {/*
      over ride head data here -- like the title tag below
      */}
      <title>Test Title from the Sample With Data Page</title>
    </Head>
    {data}
    <style jsx>{`
    
      //styles go here
    `}</style>
  </PageTemplate>

// SampleWithData.getInitialProps = async () => {
  // const toFetch = getAPIUrl('sample')
  // const response = await fetch(toFetch)
  // const data = await response.json()
  // return { data: data.results }
// }

export default SampleWithData
