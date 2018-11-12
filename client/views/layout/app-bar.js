import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

@withStyles(styles)
export default class MainAppBar extends Component {
  static propTypes={
    classes: PropTypes.object.isRequired,
  }

  onHomeIconClick = () => {

  }

  createButtonClick=() => {

  }

  loginButtonClick=() => {

  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
            JNode
            </Typography>
            <Button variant="raised" color="primary" onClick={this.createButtonClick}>新建话题</Button>
            <Button color="inherit" onClick={this.loginButtonClick}>登陆</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
