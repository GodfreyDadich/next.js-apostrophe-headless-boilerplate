import PageTemplate from '../lib/components/PageTemplate'
import SimpleAuthForm from '../lib/components/SimpleAuthForm'

class SamplePage extends React.Component {
  render() {
    return (
    <PageTemplate classNames='home'>
      <SimpleAuthForm />
    </PageTemplate>
  )}
}

export default SamplePage
