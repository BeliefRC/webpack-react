import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    margin: 24,
    marginTop: 80,
  },
  '@media screen and (max-width: 480px)': {
    root: {
      margin: 10,
      marginTop: 70,
    },
  },
}


const Container = ({ classes, children }) => (
  <Paper elevation={4} className={classes.root}>
    {children}
  </Paper>
)

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
}

export default withStyles(styles)(Container)
