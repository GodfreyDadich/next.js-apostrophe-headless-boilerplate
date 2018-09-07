import Link from 'next/link'
import PageTemplate from '../lib/components/PageTemplate'
import {Row, Column} from '../lib/components/Grid'

const SamplePage = () =>
  <PageTemplate classNames='home'>
    <Row>
      <Column columns='4' skip='4'>
        <Link href='/with-data/tester' prefetch><a>Click for a sample with data request</a></Link>
      </Column>
    </Row>
  </PageTemplate>

export default SamplePage
