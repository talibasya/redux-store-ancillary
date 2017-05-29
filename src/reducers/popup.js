import { randomId } from '../utils/math'

// TODO: allow set from outside
export let showPopupType = 'MIDDLEWARE/SHOW_POPUP'

export let hidePopupType = 'MIDDLEWARE/HIDE_POPUP'
export let hidePopupByIdType = 'MIDDLEWARE/HIDE_POPUP_BY_ID'

export let updatePopupType = 'MIDDLEWARE/UPDATE_POPUP'
export let updatePopupByIdType = 'MIDDLEWARE/UPDATE_POPUP_BY_ID'

export let cleanStackType = 'MIDDLEWARE/CLEAN_STACK'

export const showPopup = (name, payload, id) => ({
  type: showPopupType,
  name, id, payload
})

export const hidePopup = (name) => ({
  type: hidePopupType,
  name
})

export const hidePopupById = (id) => ({
  type: hidePopupByIdType,
  id
})

export const updatePopup = (name, payload) => ({
  type: updatePopupType,
  name, payload
})

export const updatePopupById  = (id, payload) => ({
  type: updatePopupByIdType,
  name, payload
})

export const cleanStack = () => ({
  type: cleanStackType
})

const initialState = []

const deepCopy = (state) => {
  return state.map(popup => ({...popup}) ).slice()
}

const ACTION_HANDLERS = {
  [showPopupType]: (state, action) => {
    const newState = deepCopy(state)

    newState.push({
      id: action.id !== undefined ? action.id : randomId(),
      name: action.name,
      params: action.payload
    })

    return newState
  },
  [hidePopupType]: (state, action) => {
    let newState = deepCopy(state)

    newState = newState.filter(popupItem => popupItem.name !== action.name)
    return newState
  },
  [hidePopupByIdType]: (state, action) => {
    let newState = deepCopy(state)
    newState = newState.filter(popupItem => popupItem.id !== action.id)

    return newState
  },
  [updatePopupType]: (state, action) => {
    let copyState = deepCopy(state)

    const newState = copyState.map(popup => {
      if (popup.name !== action.name) return popup
      return {
        ...popup,
        params: action.payload
      }
    })

    return newState
  },
  [updatePopupByIdType]: (state, action) => {
    let copyState = deepCopy(state)

    const newState = copyState.map(popup => {
      if (popup.id !== action.id) return popup
      return {
        ...popup,
        params: action.payload
      }
    })

    return newState
  },
  [cleanStackType]: (state, action) => {
    return []
  }
}

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default reducer
