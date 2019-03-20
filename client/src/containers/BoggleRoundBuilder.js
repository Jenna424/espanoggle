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

  render() {
    const { roundId, buildNewRound } = this.state;
    return (
      <BoggleGame
        key={roundId}
        countdown={180}
        restartAutomatically={roundId > 1}
        jugarDeNuevo={buildNewRound}
      />
    )
  }
}

export default BoggleRoundBuilder;