import { randomId } from '../utils/math'
export NotificationProvider from '../providers/NotificationProvider'

export let showNotificationType = 'MIDDLEWARE/SHOW_NOTIFICATION'
export let hideNotificationType = 'MIDDLEWARE/HIDE_NOTIFICATION'
export let cleanStackType = 'MIDDLEWARE/CLEAR_STACK'

export const showNotification = (level, payload) => ({
  type: showNotificationType,
  level,
  payload,
  id: randomId()
})

export const hideNotification = (id) => ({
  type: hideNotificationType,
  payload: {
    id
  }
})

export const cleanStack = () => ({
  type: cleanStackType
})

export const showError = (payload) => showNotification('error', payload)
export const showSuccess = (payload) => showNotification('success', payload)
export const showWarning = (payload) => showNotification('warning', payload)
export const showInfo = (payload) => showNotification('info', payload)

const initialState = []

const deepCopy = (state) => ([...state])

const ACTION_HANDLERS = {
  [showNotificationType]: (state, action) => {
    const newState = deepCopy(state)

    newState.push({
      id: action.id,
      level: action.level,
      params: action.payload
    })

    return newState
  },
  [hideNotificationType]: (state, action) => {
    const newState = state.filter(notificationItem => notificationItem.id !== action.payload.id)
    return newState
  },
  [cleanStackType]: (state, action) => []
}

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default reducer
