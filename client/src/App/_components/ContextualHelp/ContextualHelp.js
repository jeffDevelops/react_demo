import React, { Component } from 'react';
import './ContextualHelp.scss';

class ContextualHelp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="ContextualHelp__button btn-floating btn-large waves-effect"
        tabIndex="0">
        <i className="material-icons">question_answer</i>
      </button>
    );
  }
}

export default ContextualHelp;