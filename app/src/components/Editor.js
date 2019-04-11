// @flow

import React, { Component } from 'react';
import { AutoComplete } from 'antd'
import { connect } from 'react-redux'
import * as actions from '../state/actions'

const mapActions = dispatch => ({
  edit: (idExample, update) => {
    dispatch(actions.edit(idExample, update))
  },
})

class Editor extends Component {
  handleIntentChange(intent: string) {
    const { edit, example } = this.props

    edit(example.id, {
      intent,
    })
  }

  render() {
    const { example, source, style, nameComponent, placeholder } = this.props
    return (
      <AutoComplete
        dataSource={source}
        style={{ width: 230, ...style }}
        value={example[nameComponent]}
        onSelect={value => this.handleIntentChange(value)}
        onChange={value => this.handleIntentChange(value)}
        placeholder={placeholder}
      />
    )
  }
}

export default connect(null, mapActions)(Editor)
