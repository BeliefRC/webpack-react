import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
// eslint-disable-next-line no-unused-vars
import { topicPrimaryStyle, topicSecondaryStyle } from './style'

const Primary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.tab}>{topic.tab}</span>
    <span className={classes.title}>{topic.title}</span>
  </div>
)
const StylePrimary = withStyles(topicPrimaryStyle)(Primary)

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.username}>
      {topic.author.loginname}
    </span>
    <span className={classes.count}>
      <span className={classes.accentColor}>
        {topic.reply_count}
      </span>
      <span>/</span>
      <span>
        {topic.visit_count}
      </span>
    </span>
    <span>
        创建时间：
      {topic.create_at}
    </span>
  </span>
)
const StyleSecondary = withStyles(topicSecondaryStyle)(Secondary)

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar alt="Remy Sharp" src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StylePrimary topic={topic} />}
      secondary={<StyleSecondary topic={topic} />}
    />
  </ListItem>
)

Secondary.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
}
Primary.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
}
TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

export default TopicListItem
