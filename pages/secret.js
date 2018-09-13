import PropTypes from 'prop-types'

import secure from '../lib/hoc/secure'


const Secret = ({ loggedUser }) => (
  <div>
    <Content>
      Hi <strong>{loggedUser.email}</strong>. This is a super secure page! Try loading this page again using the incognito/private mode of your browser.
    </Content>
  </div>
)

Secret.propTypes = {
  loggedUser: PropTypes.object.isRequired
}

export default secure(Secret)