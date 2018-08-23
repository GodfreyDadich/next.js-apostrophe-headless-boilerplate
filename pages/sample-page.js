import Link from 'next/link'
import PageTemplate from '../lib/components/PageTemplate'

const SamplePage = () =>
  <PageTemplate classNames='home'>
    <Link href='/with-data/tester' prefetch><a>Click for a sample with data request</a></Link>
  </PageTemplate>

export default SamplePage
