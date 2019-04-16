// @flow
const ROOT_PATH = process.env.NODE_ENV === 'production'
  ? '/'
  : 'http://localhost:4321/'

export const RESET = 'RESET'
export const reset = () => ({
  type: RESET,
})

export const EDIT = 'EDIT'
export const edit = (id, value, className) => ({
  type: EDIT,
  payload: { id, value, className }
})

export const DELETE_EXAMPLE = 'DELETE_EXAMPLE'
export const deleteExample = (id) => ({
  type: DELETE_EXAMPLE,
  payload: { id }
})

export const SET_SELECTION = 'SET_SELECTION'
export const setSelection = (id, start, end) => ({
  type: SET_SELECTION,
  payload: { id, start, end }
})

export const FETCH_DATA = 'FETCH_DATA'
export const fetchData = (path, data) => ({
  type: FETCH_DATA,
  payload: { path, data }
})
export const loadData = () => async (dispatch) => {
  const response = await fetch(`${ROOT_PATH}data`, {
    method: 'POST',
  })
  const json = await response.json()
  dispatch(fetchData(json.path, json.data))
}

export const SAVING_DONE = 'SAVING_DONE'
export const save = (source) => async (dispatch) => {
  const response = await fetch(`${ROOT_PATH}save`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: source,
  })
  //TODO add progressing feedback
  const json = await response.json()
  if (json.ok) {
    dispatch({
      type: SAVING_DONE,
    })
  }
}

export const EXPAND = 'EXPAND'
export const expand = (id) => ({
  type: EXPAND,
  payload: { id }
})

export const COLLAPSE = 'COLLAPSE'
export const collapse = (id) => ({
  type: COLLAPSE,
  payload: { id }
})

export const OPEN_ADD_MODAL = 'OPEN_ADD_MODAL'
export const openAddModal = (number) => ({
  type: OPEN_ADD_MODAL,
  payload: {number}
})
export const SET_MODAL_ID = 'SET_MODAL_ID'
export const setModalId = (className) => ({
  type: SET_MODAL_ID,
  className
})
export const CLOSE_ADD_MODAL = 'CLOSE_ADD_MODAL'
export const closeAddModal = (className) => ({
  type: CLOSE_ADD_MODAL,
  payload: { className }
})
export const SAVE_AND_CLOSE_ADD_MODAL = 'SAVE_AND_CLOSE_ADD_MODAL'
export const saveAndCloseAddModal = (className) => ({
  type: SAVE_AND_CLOSE_ADD_MODAL,
  payload: { className }
})
