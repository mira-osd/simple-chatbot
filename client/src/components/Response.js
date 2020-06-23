import React from 'react';

class Response extends React.Component {
  render() {
    return (
      <div>
        <p> {this.props.type +' - '+ this.props.msg}</p>
      </div>
    )
  }
}

export default Response;
