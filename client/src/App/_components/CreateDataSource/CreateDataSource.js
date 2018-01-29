import React, { Component } from 'react';
import { Card, Row, Input, Button } from 'react-materialize';
import ReactDOM from 'react-dom';

import './CreateDataSource.scss';

const initialState = {
  dataSourceName: '',
  estBytePerEvent: '',
  avgEPS: '',
  validName: null,
  validBPE: null,
  validEPS: null,
  nameEdited: false,
  BPEEdited: false,
  EPSEdited: false
}

class CreateDataSource extends Component {
  constructor(props) {
    super(props);

    this._serializeInputs = this._serializeInputs.bind(this);
    this._validateNameInput = this._validateNameInput.bind(this);
    this._validateBPE = this._validateBPE.bind(this);
    this._validateEPS = this._validateEPS.bind(this);

    this.state = initialState;

  }

  _validateNameInput() {
    console.log('Now validating.');
    if (this.state.dataSourceName.trim() === '') {
      this.setState({ validName: false });
    } else {
      this.setState({ validName: true });
    }
  }

  _validateBPE() {
    if (this.state.estBytePerEvent.trim() === '') {
      this.setState({ validBPE: false });
    } else {
      this.setState({ validBPE: true });
    }
  }

  _validateEPS() {
    if (this.state.avgEPS.trim() === '') {
      this.setState({ validEPS: false});
    } else {
      this.setState({ validEPS: true });
    }
  }

  _serializeInputs() {
    this.props.createDataSource(this.state)
      .then(() => {
        this.setState(initialState);
      }).catch(error => console.log(error));
  }

  render() {
    let nameProps;
    let BPEProps;
    let EPSProps;
    let buttonProps = {
      disabled: true
    }

    if (this.state.validName === false) {
      console.log('has been edited');
      nameProps = {
        error: 'This field must not be empty.'
      }
      buttonProps = {
        disabled: true
      }
    }

    if (this.state.validBPE === false) {
      BPEProps = {
        error: 'Please enter a number.',
      }
      buttonProps = {
        disabled: true
      }
    }

    if (this.state.validEPS === false) {
      EPSProps = {
        error: 'Please enter a number.',
      }
      buttonProps = {
        disabled: true
      }
    }

    if (this.state.validEPS && this.state.validBPE && this.state.validName) {
      buttonProps = {
        disabled: false
      }
    }

    return(
        <Card
          title="Create A New Scoping Question"
        >
          <Row>
            <Input
              {...nameProps}
              s={12} l={6}
              label="Data Source Name"
              value={this.state.dataSourceName}
              onChange={(event) => {
                let newValue = event.target.value;
                this.setState(() => {
                  return {
                    dataSourceName: newValue,
                    nameEdited: true
                  }
                }, () => {
                  this._validateNameInput();
                });
              }}
              // onBlur={this._validateNameInput}
              ref={el => this.nameInput = el}
            />
            <Input
              {...BPEProps}
              s={6} l={3}
              type="number"
              label="Bytes Per Event"
              minLength={1}
              value={this.state.estBytePerEvent}
              onChange={(event) => {
                let newValue = event.target.value;
                this.setState((event) => {
                  return {
                    estBytePerEvent: newValue,
                    BPEEdited: true
                  }
                }, () => {
                  this._validateBPE();
                });
              }}
              // onBlur={this._validateBPE}
            />
            <Input
              {...EPSProps}
              s={6} l={3}
              type="number"
              label="Events Per Second"
              minLength={1}
              value={this.state.avgEPS}
              onChange={(event) => {
                let newValue = event.target.value;
                this.setState((event) => {
                  return {
                    avgEPS: newValue,
                    EPSEdited: true
                  }
                }, () => {
                  this._validateEPS();
                });
              }}
              // onBlur={this._validateEPS}
            />
          </Row>
          <Row>
            <Button
              {...buttonProps}
              onClick={this._serializeInputs}
              className="add_button"
            >
              Add
            </Button>
          </Row>
        </Card>
    );
  }
}

export default CreateDataSource;
