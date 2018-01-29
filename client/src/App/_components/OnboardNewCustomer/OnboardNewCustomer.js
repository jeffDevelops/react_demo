import React, { Component } from 'react';
import { Row, Card, Input, Button } from 'react-materialize';
import './OnboardNewCustomer.scss';

import axios from 'axios';
import { API_ROOT } from '../../_environments/environments';

const initialState = {
  emailInput: '',
  validEmail: null,
  emailEdited: false
}

class OnboardNewCustomer extends Component {
  constructor(props) {
    super(props);

    this._sendSurvey = this._sendSurvey.bind(this);

    this.state = initialState;
  }

  _sendSurvey() {
     axios.post(`${API_ROOT}/sendEmail`, {email: this.state.emailInput});
  }

  _validateEmail() {
    console.log('Validate email hit');
    if(this.state.emailInput.trim() === '') {
      console.log('empty string');
      this.setState({ validEmail: false });
    } else if (this.state.emailInput.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      console.log('this is an email!');
      this.setState({ validEmail: true });
    } else {
      console.log('not empty string but not an email either');
      this.setState({ validEmail: false });
    }
  }

  render() {
    let emailInputProps;
    let buttonProps = {
      disabled: true
    }

    console.log(this.state.emailInput);

    if (this.state.validEmail === false) {
      emailInputProps ={
        error: 'Please enter a valid email address.'
      }
      buttonProps = {
        disabled: true
      }
    }

    if (this.state.validEmail) {
      buttonProps = {
        disabled: false
      }
    }

    return(
      <Card
        title="Send Scoping Survey Link"

      >
        <Row>
          <Input
            {...emailInputProps}
            s={12}
            label="Customer Email Address"
            value={this.state.emailInput}
            onChange={(event) => {
              let newValue = event.target.value;
              this.setState((event) => {
                return {
                  emailInput: newValue,
                  emailEdited: true
                }
              }, () => {
                this._validateEmail();
              });
            }}
          />
        </Row>
        <Row>
          <Button
            {...buttonProps}
            onClick={this._sendSurvey}
            className="send_button"
          >
            Send
          </Button>
        </Row>
      </Card>
    );
  }
}

export default OnboardNewCustomer;
