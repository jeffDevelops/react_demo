import React, { Component } from 'react';

import './ScopingSurvey.scss';

import ProgressBar from '../../_components/ProgressBar/ProgressBar';
import CustomerContact from '../../_components/CustomerContact/CustomerContact';
import NumberOfDevices from '../../_components/NumberOfDevices/NumberOfDevices';
import ColdStorage from '../../_components/ColdStorage/ColdStorage';

const initialState = {
  customerContactDisplayed: true,
  customerContactDone: false,
  numDevicesDisplayed: false,
  numDevicesDone: false,
  storageDisplayed: false,
  storageDone: false,
  reviewDisplayed: false,
  reviewDone: false,
  confirmationDisplayed: false
}

class ScopingSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  _moveOn(from) {
    switch(from) {
      case 'CONTACT':
        return this.setState({
          customerContactDisplayed: false,
          customerContactDone: true,
          numDevicesDisplayed: true
        });
      case 'NUM OF DEVICES':
        return this.setState({
          numDevicesDisplayed: false,
          numDevicesDone: true,
          storageDisplayed: true
        });
      case 'COLD STORAGE':
        return this.setState({
          storageDisplayed: false,
          storageDone: true,
          reviewDisplayed: true
        });
      case 'REVIEW':
        return this.setState({
          reviewDisplayed: false,
          reviewDone: true,
          confirmationDisplayed: true
        });
      default:
        console.log('You seriously broke something.');
    }
  }

  render() {
    let customerContactDisplayed = this.state.customerContactDisplayed;
    let customerContactDone = this.state.customerContactDone;
    let numDevicesDisplayed = this.state.numDevicesDisplayed;
    let numDevicesDone = this.state.numDevicesDone;
    let storageDisplayed = this.state.storageDisplayed;
    let storageDone = this.state.storageDone;
    let reviewDisplayed = this.state.reviewDisplayed;
    let reviewDone = this.state.reviewDone;

    console.log(this.props.dataSrcs);

    return (
      <div className="scoping_survey" style={{ minHeight: '100%' }}>
        <ProgressBar
          customerContactDisplayed={customerContactDisplayed}
          customerContactDone={customerContactDone}
          numDevicesDisplayed={numDevicesDisplayed}
          numDevicesDone={numDevicesDone}
          storageDisplayed={storageDisplayed}
          storageDone={storageDone}
          reviewDisplayed={reviewDisplayed}
          reviewDone={reviewDone}
        />
        { customerContactDisplayed
          ? <CustomerContact
              onNextButtonClick={() => this._moveOn('CONTACT')}
            />
          : null
        }
        <NumberOfDevices
          dataSrcs={this.props.dataSrcs}
          displayed={this.state.numDevicesDisplayed}
          onNextButtonClick={() => this._moveOn('NUM OF DEVICES')}
        />
        { storageDisplayed
          ? <ColdStorage
              onNextButtonClick={() => this._moveOn('COLD STORAGE')}
            />
          : null
        }
      </div>
    );
  }
}

export default ScopingSurvey;
