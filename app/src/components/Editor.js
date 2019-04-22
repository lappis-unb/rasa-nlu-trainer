// @flow

import React, { Component } from 'react';
import { AutoComplete } from 'antd'
import { connect } from 'react-redux'
import * as actions from '../state/actions'
import { object } from 'prop-types';

const mapActions = dispatch => ({
  edit: (idExample, update, className) => {
    dispatch(actions.edit(idExample, update, className))
  },
})

class Editor extends Component {
  handleIntentChange(value) {
    const { edit, example, className, objectProps } = this.props
    edit(example.id, { [objectProps]:value }, className)
  }
  render() {
    const { example, source, style, placeholder, objectProps } = this.props
    console.log(example[objectProps])
    return (
      <AutoComplete
        dataSource={source}
        style={{ width: 230, ...style }}
        value={example[objectProps]}
        onSelect={value => this.handleIntentChange(value)}
        onChange={value => this.handleIntentChange(value)}
        placeholder={placeholder}
        filterOption={(inputValue, option)=> option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    )
  }
}

export default connect(null, mapActions)(Editor)
