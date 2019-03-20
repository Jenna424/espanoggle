import React, { Component } from 'react';

class BoggleRoundBuilder extends Component {
  state = {
    roundId: 1
  }

  buildNewRound = () => (
    this.setState((prevState, props) => ({
      roundId: prevState.roundId + 1
    }))
  )
}

export default BoggleRoundBuilder;