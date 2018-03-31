export PopupProvider from '../providers/PopupProvider'

// TODO: allow set from outside
export let showPopupType = 'MIDDLEWARE/SHOW_POPUP'
export let hidePopupType = 'MIDDLEWARE/HIDE_POPUP'
export let updatePopupType = 'MIDDLEWARE/UPDATE_POPUP'
export let cleanStackType = 'MIDDLEWARE/CLEAN_STACK'

export const showPopup = (name, payload) => ({
  type: showPopupType,
  name, payload
})

export const hidePopup = (name) => ({
  type: hidePopupType,
  name
})

export const updatePopup = (name, payload) => ({
  type: updatePopupType,
  name, payload
})

export const cleanStack = () => ({
  type: cleanStackType
})

const initialState = {}

const deepCopy = (state) => ({ ...state })

const ACTION_HANDLERS = {
  [showPopupType]: (state, action) => {
    const newState = deepCopy(state)

    if (!newState[action.name]) {
      newState[action.name] = {
        name: action.name,
        params: action.payload
      }
    }

    return newState
  },
  [hidePopupType]: (state, action) => {
    let newState = deepCopy(state)
    delete newState[action.name]

    return newState
  },
  [updatePopupType]: (state, action) => {
    let newState = deepCopy(state)

    if (newState[action.name]) {
      newState[action.name] = {
        ...copyState[action.name],
        params: action.payload
      }
    }

    return newState
  },
  [cleanStackType]: (state, action) => {
    return {}
  }
}

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default reducer
