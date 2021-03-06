'use strict';

import React   from 'react/addons';
import Actions from "actions/SendMessageAction";
import 'styles/SendMessage.scss';

class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      theme: props.theme
    };
  }

  componentDidMount() {
    this.unsubscribe = Actions.onPanelClosed.listen(() => this.refs.message.focus());
    this.refs.message.focus();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ theme: nextProps.theme });
  }

  sendMessage(event) {
    event.preventDefault();
    var text = this.refs.message.value.trim();
    this.props.onSendMessage(text);
    this.refs.message.value = '';
    this.refs.message.focus();
    return;
  }

  render() {
    return (
      <div className="SendMessage">
        <form onSubmit={this.sendMessage.bind(this)}>
          <input type="text" ref="message" placeholder="Type a message..." autoComplete={true} style={this.state.theme}/>
        </form>
      </div>
    );
  }

}

export default SendMessage;
