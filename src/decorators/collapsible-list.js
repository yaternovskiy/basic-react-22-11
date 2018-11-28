import React from 'react'

export default (OriginalComponent) =>
  class CollapsibleList extends React.Component {
    state = {
      isExpanded: false
    }

    toggleExpand = (ev) => {
      this.setState((state) => {
        return { isExpanded: !this.state.isExpanded }
      })
    }

    render() {
      return (
        <OriginalComponent
          {...this.props}
          isExpanded={this.state.isExpanded}
          toggleExpand={this.toggleExpand}
        />
      )
    }
  }
