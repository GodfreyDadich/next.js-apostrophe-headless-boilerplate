import Link from 'next/link'
import PageTemplate from '../lib/components/PageTemplate'
import {Row, Column} from '../lib/components/Grid'

const SamplePage = () =>
  <PageTemplate classNames='home'>
    <Row>
      <Column columns='4' skip='4'>
      <h1>Nope.</h1>
      <h4>Something went wrong you should prolly hit back or go <Link href='/' prefetch><a>Home</a></Link></h4>
      </Column>
    </Row>
  </PageTemplate>

export default SamplePage