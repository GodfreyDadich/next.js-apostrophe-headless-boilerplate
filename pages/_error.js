import Link from 'next/link'
import pageTemplate from '../lib/hoc/default'
import {Row, Column} from '../lib/components/Grid'

const SamplePage = () =>
  <Row>
    <Column columns='4' skip='4'>
    <h1>Nope.</h1>
    <h4>Something went wrong you should prolly hit back or go <Link href='/' prefetch><a>Home</a></Link></h4>
    </Column>
  </Row>

export default pageTemplate(SamplePage)