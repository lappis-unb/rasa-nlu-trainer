// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import getColor from '../utils/getColor'
import * as actions from '../state/actions'
import { Input } from 'antd'

const styles = {
  text: {},
  highlightText: {
    color: 'transparent',
    pointerEvents: 'none',
    padding: '5px 8px',
    whiteSpace: 'pre',
  },
  zeroPos: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  input: {
    background: 'none',
    border: 'none',
    width: '100%',
  }
}

const mapActions = dispatch => ({
  edit: (idExample, update, className) => {
    dispatch(actions.edit(idExample, update, className))
  },
  setSelection: (idExample, start, end) => {
    dispatch(actions.setSelection(idExample, start, end))
  },
})

class TextEditor extends Component {
  selectionAnchorNode: Node;
  inputNode: HTMLInputElement;

  handleTextChange(event: Object) {
    const {
      object,
      edit,
      className,
      objectProp
    } = this.props
    const text = event.target.value

    //update the entity boudaries
    edit(object.id, {
      [objectProp]: text,
    }, className)
  }

  render() {
    const { placeholder, object, style, objectProp } = this.props
    
    return (
      <div style={{ width: '100%', ...style }}>
        <div
          style={{ position: 'relative' }}
          ref={node => this.selectionAnchorNode = node}
        >
          <Input
            ref={node => this.inputNode = node && findDOMNode(node)}
            onChange={event => this.handleTextChange(event)}
            value={object[objectProp]}
            placeholder={placeholder}
          />
        </div>
      </div>
    )
  }
}

TextEditor.propTypes = {
  example: PropTypes.shape({
    text: PropTypes.string.isRequired
  })
}

export default connect(null, mapActions)(TextEditor)
