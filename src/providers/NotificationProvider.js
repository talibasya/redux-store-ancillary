import React from 'react'
import { hideNotification } from '../reducers/notification'

class AppNotification extends React.Component {

  showing = []
  withChildren = false

  constructor (props) {
    super(props)
    this.withChildren = !!this.props.children
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
      formatNewNotifications = newNotifications.map(notifItem => ({
        ...notifItem,
        open: true,
        onClose: () => console.log('emit remove item from state')
      }))

      if (!this.props.autoClose) {
        formatOldNotifications = this.showing.map(notifItem => {
          const stillOpen = nextProps.notification.some(nextNotif => nextNotif.id === notifItem.id )
          if (stillOpen) return notifItem

          return {
            ...notifItem,
            open: false
          }
        })
      }
    }

    this.showing = [
      ...formatOldNotifications,
      ...formatNewNotifications
    ]

  }

  filterActive = (notifications) => {
    const stillShowing = notifications.filter(propNotif => {
      return this.showing.some(stateNotif => stateNotif.id === propNotif.id)
    })

    return stillShowing
  }

  onRemoveHandler = (id) => () => {
    this.props.hideNotification(id)
  }

  getArrayDifference = (arr1, arr2) => arr1.filter(notif1 => {
    return !arr2.some(notif2 => notif2.id === notif1.id)
  })

  render () {
    const Parent = React.cloneElement(this.props.children)

    const elements = this.showing.map(notifItem => (
      React.cloneElement(Parent.props.children, {
        ...notifItem
      })
    ))

    return (
      <Parent.type {...Parent.props} >
        { React.Children.toArray(elements) }
      </Parent.type>
    )
  }
}

export default AppNotification
