import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

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

export const HelloWorld = (props) => {
  const { greetings } = props;
  const greetingsList = greetings.map(
    (greeting) => <li key={greeting.greeting}>{greeting.greeting}</li>,
  );
  const { getGreetings } = props;
  return (
    <>
      Greeting:
      {' '}
      {greetings.greeting}
      <button type="button" onClick={() => getGreetings()}>GetGreetings</button>
      <br />
      <ul>{greetingsList}</ul>
    </>
  );
};

const structuredSelector = createStructuredSelector({
  greetings: (state) => state.greetings,
});

const mapDispatchToProps = { getGreetings };

HelloWorld.propTypes = {
  greetings: PropTypes.string.isRequired,
  greeting: PropTypes.string.isRequired,
  getGreetings: PropTypes.func.isRequired,
};

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);
