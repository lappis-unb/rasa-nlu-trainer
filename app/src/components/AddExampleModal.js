// @flow

import React, { Component } from 'react';
import { Modal } from 'antd'
import { connect } from 'react-redux'
import EntityTable from './EntityTable'
import TextEditor from './TextEditor'
import Editor from './Editor'
import * as actions from '../state/actions'


const mapState = (state) => ({
  example: state.examples.find(({ id }) => id === state.idExampleInModal)
})

const mapActions = dispatch => ({
  close: () => {
    dispatch(actions.closeAddModal())
  },
  saveAndClose: () => {
    dispatch(actions.saveAndCloseAddModal())
  },
})

class ExampleTable extends Component {
  render() {
    const {
      example,
      intents,
      close,
      saveAndClose,
      entityNames,
    } = this.props
    return (
      <Modal
        title='Add example'
        visible={Boolean(example)}
        onOk={() => saveAndClose()}
        onCancel={() => close()}
        okText='add'
      >
        {example
          ? (
            <div>
              <TextEditor
                example={example}
                entityNames={entityNames}
                style={{ marginBottom: 5 }}
              />
              <Editor
                example={example}
                source={intents}
                style={{ marginBottom: 5 }}
                nameComponent="intent"
                placeholder="intent"
              />
              <EntityTable
                example={example}
                entityNames={entityNames}
              />
            </div>
          )
          : null
        }
      </Modal>
    )
  }
}

export default connect(mapState, mapActions)(ExampleTable)
