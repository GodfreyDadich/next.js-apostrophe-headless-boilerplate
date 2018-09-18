import Link from 'next/link'
import PageTemplate from '../lib/components/PageTemplate'
import {Row, Column} from '../lib/components/Grid'

const Static = () =>
  <PageTemplate classNames='home'>
    <Row>
      <Column columns='4' skip='4'>
        <h1>Home Page</h1>
      </Column>
    </Row>
  </PageTemplate>

export default Static
