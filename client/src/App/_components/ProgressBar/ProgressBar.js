import React, { Component } from 'react';

import { Row, Col, Tabs, Tab } from 'react-materialize';
import './ProgressBar.scss';
import Logo from '../../_assets/GuidePoint_Logo.png';
import CustomerContact from '../CustomerContact/CustomerContact';


class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <nav className="progress_bar nav-wrapper"
      >
        <img src={Logo} className="logo"
        />
        <Row style={{ width: '100%' }}>
          <Col s={0} m={1} l={3}></Col>
          <Col s={12} m={10} l={6}>
            <div className="progress_indicator">
              <div className="step" id="contact">
                <div className={
                  "icon_container " + 
                  (!this.props.customerContactDisplayed && !this.props.customerContactDone ? "inactive" : null)
                }
                >
                  { this.props.customerContactDone
                    ? <i className="material-icons">check</i>
                    : ( this.props.customerContactDisplayed
                        ? <p>1</p>
                        : <p style={{ color: '#fff' }}>1</p>
                      )
                  }
                </div>
                <label className="step_label" htmlFor="contact">Contact Info</label>
              </div>

              <div className="step_path"></div>

              <div className="step" id="data_volume">
                <div className={
                  "icon_container " + 
                  (!this.props.numDevicesDisplayed && !this.props.numDevicesDone ? "inactive" : null)
                }
                >
                  { this.props.numDevicesDone
                    ? <i className="material-icons">check</i>
                    : ( this.props.numDevicesDisplayed
                        ? <p>2</p>
                        : <p style={{ color: '#fff' }}>2</p>
                      )
                  }
                </div>
                <label className="step_label" htmlFor="data_volume">Data Volume</label>
              </div>

              <div className="step_path"></div>

              <div className="step" id="cold_storage">
                <div className={
                  "icon_container " + 
                  (!this.props.storageDisplayed && !this.props.storageDone ? "inactive" : null)
                }
                >
                  { this.props.storageDone
                    ? <i className="material-icons">check</i>
                    : ( this.props.storageDisplayed
                        ? <p>3</p>
                        : <p style={{ color: '#fff' }}>3</p>
                      )
                  }
                </div>
                <label className="step_label" htmlFor="cold_storage">Cold Storage</label>
              </div>

              <div className="step_path"></div>

              <div className="step" id="review">
                <div className={
                  "icon_container " + 
                  (!this.props.reviewDisplayed && !this.props.reviewDone ? "inactive" : null)
                }
                >
                  { this.props.reviewDone
                    ? <i className="material-icons">check</i>
                    : ( this.props.reviewDisplayed
                        ? <p>4</p>
                        : <p style={{ color: '#fff' }}>4</p>
                      )
                  }
                </div>
                <label className="step_label" htmlFor="review">Review</label>
              </div>
            </div>
          </Col>
          <Col s={0} m={1} l={3}></Col>
        </Row>
      </nav>
    );
  }

}

export default ProgressBar;

