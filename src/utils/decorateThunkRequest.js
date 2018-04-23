import { showSpinner, hideSpinner } from '../reducers/spinner'
import { showError } from '../reducers/notification'

const decorateThunkRequest = ({ onCall, onSuccess, onError, noSpinner }) => (params) => {
  let call, success, spinner
  if (params) {
    call = params.call
    success = params.success
    spinner = params.spinner
  }

  return (dispatch, getState) => {
    if (!noSpinner) dispatch(showSpinner(spinner))
    onCall({ dispatch, getState, call })
      .then(response => {
        if (!noSpinner) dispatch(hideSpinner(spinner))
        onSuccess({ dispatch, getState, response, call, success })
      })
      .catch(error => {
        if (!noSpinner) dispatch(hideSpinner(spinner))
        if (onError) onError({ dispatch, getState, call, error })
        else dispatch(showError(error))
      })
  }
}

export default decorateThunkRequest
