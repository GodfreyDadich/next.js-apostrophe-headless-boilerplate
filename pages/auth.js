import pageTemplate from '../lib/hoc/default'
import SimpleAuthForm from '../lib/components/SimpleAuthForm'

class SampleAuth extends React.Component {
  render() {
    return (
      <SimpleAuthForm />
  )}
}

export default pageTemplate(SampleAuth)
