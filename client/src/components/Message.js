'use strict';

import React        from "react";
import TransitionGroup from "react-addons-css-transition-group";
import User         from "components/User";
import TextMessage  from "components/TextMessage";
import File         from "components/File";
import Directory    from "components/Directory";
import "styles/Message.scss";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      colorifyUsername: props.colorifyUsername,
      useEmojis: props.useEmojis,
      username: props.username,
      hasHighlights: false,
      isCommand: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ colorifyUsername: nextProps.colorifyUsername, useEmojis: nextProps.useEmojis, username: nextProps.username });
  }

  onDragEnter(event) {
    this.props.onDragEnter(event);
  }

  onHighlight(command) {
    if(command) {
      this.setState({ isCommand: true });
    } else {
      this.props.onHighlight(this.state.message);
      this.setState({ hasHighlights: true });
    }
  }

  render() {
    var safeTime = (time) => ("0" + time).slice(-2);
    var date     = new Date(this.state.message.ts);
    var ts       = safeTime(date.getHours()) + ":" + safeTime(date.getMinutes()) + ":" + safeTime(date.getSeconds());
    // ts   = this.state.message.ts;

    var content = '...';
    if(this.state.message.type === "msg") {
      content = <TextMessage
                  message={this.state.message}
                  useEmojis={this.state.useEmojis}
                  highlight={this.state.username}
                  onHighlight={this.onHighlight.bind(this)}
                  />;
    } else if(this.state.message.type === "file") {
      content = <File message={this.state.message}/>;
    } else if(this.state.message.type === "list") {
      content = <Directory message={this.state.message} root={true}/>;
    }

    var className = this.state.hasHighlights ? "Message highlighted" : "Message";
    var contentClass = this.state.isCommand ? "Content command" : "Content";

    return (
      <TransitionGroup
        transitionName="messagesAnimation"
        transitionAppear={true}
        component="div"
        className={className}
        onDragEnter={this.onDragEnter.bind(this)}>
        <span className="Timestamp">{ts}</span>
        <User userId={this.state.message.uid} colorify={this.state.colorifyUsername} highlight={this.state.isCommand}/>
        <div className={contentClass}>{content}</div>
      </TransitionGroup>
    );
  }

}

export default Message;
