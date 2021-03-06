'use strict';

import React   from 'react';
import Actions from "actions/SendMessageAction";
import 'styles/SwarmView.scss';

var TransitionGroup = React.addons.CSSTransitionGroup;

class SwarmView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peers: []
    };
  }

  componentDidMount() {
    this.poller = setInterval(() => {
      Actions.getSwarm((peers) => this.setState({ peers: peers }));
    }, 1000);
    Actions.getSwarm((peers) => this.setState({ peers: peers }));
  }

  componentWillUnmount() {
    clearInterval(this.poller);
  }

  render() {
    var peers = this.state.peers.map((p) => {
      return (
        <TransitionGroup key={"t" + p} transitionName="peerAnimation" transitionAppear={true} component="div" className="peer">
          <svg width="20" height="8" key={"svg" + p}><circle cx="4" cy="4" r="4" fill="rgba(116, 228, 96, 0.8)"/></svg>
          <span key={p}>{p}</span>
        </TransitionGroup>
      );
    });

    return (
      <div className="SwarmView">
        <div className="summary">Peers connected <span className="green">{this.state.peers.length}</span></div>
        <div className="peers">
          {peers}
        </div>
      </div>
    );
  }

}

export default SwarmView;
