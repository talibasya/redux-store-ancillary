import { showSpinner, hideSpinner } from '../reducers/spinner'
import { showError } from '../reducers/notification'

const decorateThunkRequest = ({ onCall, onSuccess, onError }) => (params) => {
  let call, success, spinner
  if (params) {
    call = params.call
    success = params.success
    spinner = params.spinner
  }

  return (dispatch, getState) => {
    dispatch(showSpinner(spinner))
    onCall({ dispatch, getState, call })
      .then((...response) => {
        dispatch(hideSpinner(spinner))
        onSuccess({ dispatch, getState, response, success })
      })
      .catch(error => {
        dispatch(hideSpinner(spinner))
        if (onError) onError({ dispatch, getState, call, error })
        else dispatch(showError(error))
      })
  }
}

export default decorateThunkRequest
