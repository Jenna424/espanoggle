import React, { Component } from 'react';

class BoggleBuilder extends Component {
  state = {
  	boggleRound: 1
  }

  buildNewRound = () => (
  	this.setState((prevState, props) => ({
  	  boggleRound: prevState.boggleRound + 1
  	}))
  )
}

export default BoggleBuilder;