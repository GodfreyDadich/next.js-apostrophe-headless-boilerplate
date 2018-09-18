import fetch from 'isomorphic-fetch'
import Head from 'next/head'
import { getAPIUrl } from '../lib/utils/dataHelpers'
import PageTemplate from '../lib/components/PageTemplate'

const WithData = ({ data }) =>
  <PageTemplate>
    <Head>
      {/*
      over ride head data here -- like the title tag below
      */}
      <title>{data.title} | Godfrey Dadich Partners</title>
    </Head>
      {/* insert templates based on page type */}
    <style jsx>{`
    
      //styles go here
    `}</style>
    <h1>{data.title}</h1>
  </PageTemplate>

WithData.getInitialProps = async ({res, query}) => {
  const toFetch = getAPIUrl('apostrophe-pages', `slug=/${query.slug}`)
  const response = await fetch(toFetch)
  const data = await response.json()
  if (data.error) {
    const err = new Error()
    err.code = 'ENOENT'
    throw err
  } else {
    return { data: data }
  }
}

export default WithData
