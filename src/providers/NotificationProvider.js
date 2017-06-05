import React from 'react'
import { hideNotification } from '../reducers/notification'

class AppNotification extends React.Component {

  showing = []
  withChildren = false

  closeTimeouts = []

  constructor (props) {
    super(props)
    this.withChildren = !!this.props.children
  }

  removeNotifComponent = id => () => {
    this.showing = this.showing.filter(notifItem => notifItem.props.id !== id)
    this.forceUpdate()
  }

  componentWillMount() {
    this.closeTimeouts.map(timeoutItem => clearTimeout(timeoutItem))
  }

  componentWillUpdate (nextProps, nextState) {
    const newNotifications = this.getArrayDifference(nextProps.notification, this.props.notification)

    if (newNotifications.length) {
      if (this.props.onShow) this.props.onShow(newNotifications)
      if (this.props.autoClose) newNotifications.map(closeNotification => this.props.autoClose(closeNotification.id))
    }


    let formatNewNotifications = [];
    let formatOldNotifications = [];

    if (this.withChildren) {
      formatNewNotifications = newNotifications.map(notifItem => {
        return React.cloneElement(this.props.children.props.children, {
          ...notifItem,
          open: true
        })
      })

      formatOldNotifications = this.showing.map(notifItem => {
        const stillOpen = nextProps.notification.some(nextNotif => nextNotif.id === notifItem.props.id )
        if (stillOpen) return notifItem

        let timeout = 0
        if (notifItem.props.timeout) timeout = notifItem.props.timeout

        this.closeTimeouts.push(
          setTimeout(this.removeNotifComponent(notifItem.props.id), timeout)
        )

        return React.cloneElement(notifItem, {
          ...notifItem.props,
          open: false
        })
      })

      this.showing = [
        ...formatOldNotifications,
        ...formatNewNotifications
      ]
    }
  }

  onRemoveHandler = (id) => () => {
    this.props.hideNotification(id)
  }

  getArrayDifference = (arr1, arr2) => arr1.filter(notif1 => {
    return !arr2.some(notif2 => notif2.id === notif1.id)
  })

  render () {

    if (!this.props.children) return null

    const Parent = React.cloneElement(this.props.children)

    // const elements = this.components.map(notifItem => (
    //   React.cloneElement(Parent.props.children, {
    //     ...notifItem
    //   })
    // ))

    return (
      <Parent.type {...Parent.props} >
        { this.showing.map(Component => <Component.type {...Component.props} key={Component.props.id} />) }
      </Parent.type>
    )
  }
}

export default AppNotification
