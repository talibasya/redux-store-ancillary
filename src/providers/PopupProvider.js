import React from 'react'

class PopupProvider extends React.Component {

  render () {
    const { children, popup } = this.props

    const Parent = React.cloneElement(children)
    let modifiedChildren = []

    React.Children.forEach(children, child => {
      React.Children.forEach(child.props.children, child2 => {
        const currentPopup = popup[popup.name]
        const params = currentPopup ? currentPopup.params : undefined
        const open = !!currentPopup

        const clonedElement = React.cloneElement(child2, { open, params });
        modifiedChildren.push(clonedElement)
      })
    })

    // console.log('children2', modifiedChildren[0]);

    return (
      <Parent.type {...Parent.props} >
        {modifiedChildren.map(Component => <Component.type {...Component.props} key={Component.props.name} />) }
      </Parent.type>
    )
  }
}

export default PopupProvider
