import React, { Component, Fragment } from 'react'
import axios from 'axios'
/* eslint-disable */
export default class TestApi extends Component {
  getTopics = () => {
    axios.get('/api/topics')
      .then((resp) => {
        console.log(resp)
      }).catch((err) => {
        console.log(err)
      })
  }

  login = () => {
    axios.post('/api/user/login', {
      accessToken: '',// 配置Access Token 字符串
    })
      .then((resp) => {
        console.log(resp)
      }).catch((err) => {
        console.log(err)
      })
  }

  markAll = () => {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then((resp) => {
        console.log(resp)
      }).catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </Fragment>
    )
  }
}
/* eslint-enable */
