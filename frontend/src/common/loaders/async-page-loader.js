import React from 'react'

import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'


const AsyncLoader = ({ error, retry }) => {
  if (error) return <div>Error: {error.message}<button onClick={retry}>Retry</button></div>
  else return <Loader active size="tiny" />
}


AsyncLoader.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  retry: PropTypes.func,
}


export default AsyncLoader
