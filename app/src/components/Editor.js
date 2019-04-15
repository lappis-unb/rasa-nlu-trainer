// @flow

import React, { Component } from 'react';
import { AutoComplete } from 'antd'
import { connect } from 'react-redux'
import * as actions from '../state/actions'

const mapActions = dispatch => ({
  edit: (idExample, update, className) => {
    dispatch(actions.edit(idExample, update, className))
  },
})

class Editor extends Component {
  handleIntentChange(intent) {
    const { edit, example, className } = this.props
    edit(example.id, { intent }, className)
  }
  render() {
    const { example, source, style, nameComponent } = this.props
    return (
      <AutoComplete
        dataSource={source}
        style={{ width: 230, ...style }}
        value={example[nameComponent]}
        onSelect={value => this.handleIntentChange(value)}
        onChange={value => this.handleIntentChange(value)}
        placeholder={nameComponent}
      />
    )
  }
}

export default connect(null, mapActions)(Editor)
