export let showSpinnerType = 'MIDDLEWARE/SHOW_SPINNER'
export let hideSpinnerType = 'MIDDLEWARE/HIDE_SPINNER'

export const showSpinner = (payload) => ({
  type: showSpinnerType,
  payload
})

export const hideSpinner = (payload) => ({
  type: hideSpinnerType,
  payload
})

const initialState = {
  items: {},
  rendering: null
}

const deepCopy = (state) => ({ ...state, items: {...state.items} })

const ACTION_HANDLERS = {
  [showSpinnerType]: (state, action) => {
    const newState = deepCopy(state)

    if (action.payload && action.payload.id) {
      newState.items[action.payload.id] = {
        params: action.payload,
        id: action.payload.id
      }
    } else {
      newState.rendering = {
        params: action.payload
      }
    }

    return newState
  },
  [hideSpinnerType]: (state, action) => {
    const newState = deepCopy(state)

    if (action.payload && action.payload.id) {
      delete newState.items[action.payload.id]
    } else {
      newState.rendering = null
    }

    return newState
  }
}

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default reducer
