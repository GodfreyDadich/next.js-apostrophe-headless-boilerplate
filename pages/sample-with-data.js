import fetch from 'isomorphic-fetch'
import Head from 'next/head'
// import { getAPIUrl } from '../lib/utils/dataHelpers'
import PageTemplate from '../lib/components/PageTemplate'

const SampleWithData = ({ data }) =>
  <PageTemplate>
    <Head>
      {/*
      over ride head data here -- like the title tag below
      */}
      <title>Test Title from the Sample With Data Page</title>
    </Head>
    <ul>
      {
        data.map((item, index) => <li key={`item${index}`}>
          <h3><a href={item.link} target='_blank'>{item.title}</a></h3>
          <span>View Count: {item.view_count}</span>
        </li>)
      }
    </ul>
    <style jsx>{`
    
      //styles go here
    `}</style>
  </PageTemplate>

SampleWithData.getInitialProps = async () => {
  const toFetch = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow` //getAPIUrl('sample')
  const response = await fetch(toFetch)
  const data = await response.json()
  return { data: data.items }
}

export default SampleWithData
