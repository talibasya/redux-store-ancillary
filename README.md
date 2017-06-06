# redux-store-ancillary

### Description
Ready common logic flow for popup, notification and spinner. Easy to integrate to your project based on `react` `redux` + `redux-thunk`. Compatible with `react-native` and `react-vr`.
### Getting started
Install your package:
`npm install --save git+https://github.com/talibasya/redux-store-ancillary.git`
Then attach reducers to your project:
```diff
import locationReducer from './location' // your reducers. Was here before
+ import notification from 'redux-store-ancillary/notification'
+ import spinner from 'redux-store-ancillary/spinner'
+ import popup from 'redux-store-ancillary/popup'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
+    notification,
+    spinner,
+    popup,
    ...asyncReducers
  })
}
```
Prepare container (examples):
- [popup](https://gist.github.com/talibasya/699cd45368bb825527b639a3c8f84b82#file-apppopup-js)
- [notification](https://gist.github.com/talibasya/699cd45368bb825527b639a3c8f84b82#file-appnotification-js)
- [spinner](https://gist.github.com/talibasya/699cd45368bb825527b639a3c8f84b82#file-appspinner-js)

Connect action creators:
```javascript
import React from 'react'
import { connect } from 'react-redux'
+ import { showSuccess, showError, cleanStack as cleanNotificationStack } from 'redux-store-ancillary/notification'
+ import { showPopup, hidePopup, updatePopup, cleanStack } from 'redux-store-ancillary/popup'
+ import { decorateThunkRequest } from 'redux-store-ancillary/utils'
import api from 'utils/api'

const mapDispatchToProps = {
+  showSuccess, showError, cleanNotificationStack,
+  showPopup, hidePopup, updatePopup, cleanStack,
+  getUsers: decorateThunkRequest({
+    onCall: () => new Promise(resolve => { setTimeout(() => resolve(api.getGitUsers()), 3000) }),
+    onSuccess: ({ dispatch }) => dispatch(showSuccess({ param: 3 }))
+  })
}

const mapStateToProps = (state) => ({
  spinner: state.spinner
})

export class HomeView extends React.Component {

  render () {
    const isExistMyOwnSpinner = this.props.spinner.list.find(item => item.id === 'myownSpinner')
    return (
      <div>
        <h4>Welcome!</h4>
        {isExistMyOwnSpinner && <span>! Spinner !</span>}
        <div>
+          <button onClick={() => this.props.showSuccess()}>show success notification</button>
+          <button onClick={() => this.props.showSuccess({ message: 'test' })}>show success notification with timeout 3s</button>
+          <button onClick={() => this.props.showError()}>show error notification</button>
+          <button onClick={() => this.props.cleanNotificationStack()}>clean notification stack</button>
        </div>

        <div style={{margin: '20px 0'}}>
+          <button onClick={() => this.props.showPopup('test1', { 'text': 'hello new popup' })}>show popup</button>
+          <button onClick={() => this.props.hidePopup('test1')}>hide popup</button>
+          <button onClick={() => this.props.updatePopup('test1', { 'text': 'updated popup' })}>update popups</button>
+          <button onClick={() => this.props.cleanStack()}>clean stack</button>
        </div>
        <img
          alt='This is a duck, because Redux!'
          className='duck'
          src={DuckImage} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
```

TODO:
 - Project based on examples above.
 - Upgrade docs above (should be more readable) :)
 - Describe all export methods and provider behavior
