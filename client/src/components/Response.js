import React from 'react';

class Response extends React.Component {
  render() {
    let isSentByUser = false; 
    if (this.props.type === 'user') isSentByUser = true; 
    return (
      <div className="alignChat">
        {
          isSentByUser 
          ? 
            <p className="userResponse">{this.props.msg}</p>
          : 
            <p className="botResponse">{this.props.msg}</p>
        }
      </div>
    )
  }
}

export default Response;
