import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const GET_GREETINGS_REQUEST = 'GET_GREETINGS_REQUEST';
const GET_GREETINGS_SUCCESS = 'GET_GREETINGS_SUCCESS';

export function getGreetingsSuccess(json) {
  return {
    type: GET_GREETINGS_SUCCESS,
    json,
  };
}

function getGreetings() {
  return (dispatch) => {
    dispatch({ type: GET_GREETINGS_REQUEST });
    return fetch('v1/greetings.json')
      .then((response) => response.json())
      .then((json) => dispatch(getGreetingsSuccess(json)))
      .catch((error) => console.log(error));
  };
}

class HelloWorld extends React.Component {
  render() {
    const { greetings } = this.props;
    const greetingsList = greetings.map(
      (greeting) => <li key={greeting.greeting}>{greeting.greeting}</li>,
    );

    return (
      <>
        Greeting:
        {' '}
        {this.props.greeting}
        <button type="button" onClick={() => this.props.getGreetings()}>GetGreetings</button>
        <br />
        <ul>{ greetingsList }</ul>
      </>
    );
  }
}

const structuredSelector = createStructuredSelector({
  greetings: (state) => state.greetings,
});

const mapDispatchToProps = { getGreetings };

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);
