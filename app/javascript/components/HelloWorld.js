import React, { useEffect } from "react"
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { useDispatch, useSelector } from "react-redux";
import { fetchRandomGreeting } from "../configureStore";

const GET_GREETINGS_REQUEST = 'GET_GREETINGS_REQUEST';
const GET_GREETINGS_SUCCESS = 'GET_GREETINGS_SUCCESS';

function getGreetings(){
  console.log('getGreetings() method Action triger!');
  return dispatch => {
    dispatch({ type: GET_GREETINGS_REQUEST});
    return fetch('v1/greetings.json')
      .then(response => response.json())
      .then(json => dispatch(getGreetingsSuccess(json)))
      .catch(error => console.log(error));    
  };
};

export function getGreetingsSuccess(json){
  return {
    type: GET_GREETINGS_SUCCESS,
    json
  };
};

class HelloWorld extends React.Component {
  render () {
    const { greetings } = this.props;
    const greetingsList = greetings.map((greeting) => {
      return <li key={greeting.greeting}>{greeting.greeting}</li>
    })

    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
        <button className="" onClick={() => this.props.getGreetings()}>GetGreetings</button>
        <br />
        <ul>{ greetingsList }</ul>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  greetings: state => state.greetings,
});

const mapDispatchToProps = { getGreetings };

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);
