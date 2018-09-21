import Link from 'next/link'
import pageTemplate from '../lib/hoc/default'
import {Row, Column} from '../lib/components/Grid'

const Static = () =>
  <Row>
    <Column columns='4' skip='4'>
      <h1>Home Page</h1>
    </Column>
  </Row>

export default pageTemplate(Static)
