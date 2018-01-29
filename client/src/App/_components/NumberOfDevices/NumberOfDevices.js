import React, { Component } from 'react';

import { Card, Badge, Button, Row, Col, Input } from 'react-materialize';
import './NumberOfDevices.scss';

const initialState = {
  dataSrcObjects: [],
  doneWithComponent: false
}

class NumberOfDevices extends Component { 
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentWillReceiveProps(newProps) {
    let dataSourceObjects = [];
    newProps.dataSrcs.forEach(datasrc => {
      let obj = {
        dataSourceName: datasrc.dataSourceName,
        filledOut: false,
        value: null
      };
      dataSourceObjects.push(obj);
    });
    console.log(dataSourceObjects);
    this.setState({
      dataSrcObjects: dataSourceObjects
    });
  }

  render() {
    console.log(this.state.dataSrcObjects);
    let dataSrcs = this.state.dataSrcObjects; 
    let displayed = this.props.displayed;
    let done = this.state.doneWithComponent;
    return (
      <Row 
        style={ this.props.displayed ? { display: 'block' } : { display: 'none'} }
      >
        <Col s={0} m={1} l={3}></Col>
        <Col s={12} m={10} l={6}>
          <Card className={"number_of_devices " + (displayed ? "on_page " : "off_page ") + (done ? "dismiss" : null)}
            title="Number of Devices Per Data Source"
            style={{ marginTop: '125px'}}
          >
            <Row>
              <p style={{ width: '93%', margin: '0 auto'}}
              >
                For all applicable data sources, please provide a number of devices:
              </p>
            </Row>
            <Row>
            <ul className="collapsible survey_accordion" data-collapsible="accordion"
                style={{ boxSizing: 'border-box', margin: '0 auto', width: '93%'}}
            >
              {dataSrcs.map((datasrc, index) => {
                return (
                  <li key={index}>
                    <div className="collapsible-header">
                      <i className="material-icons">expand_more</i>
                      <span className="data_source_name">{datasrc.dataSourceName}</span>
                      { datasrc.value 
                        ? <span className="new badge" data-badge-caption={datasrc.value}></span>
                        : null
                      }
                    </div>
                    <div className="collapsible-body">
                      <Row>
                        <Input
                          s={8} m={6} l={6}
                          label="Number of Devices"
                          onKeyPress={(event) => {
                            console.log(event.key);
                            if (event.which < 48 || event.which > 57 && event.which != 8) {
                              console.log('hi');
                              console.log(event);
                              event.preventDefault();
                            }
                          }}
                          onChange={(event) => {
                            if (event.target.value !== null || event.target.value === '') {
                              dataSrcs[index].filledOut = true;
                              dataSrcs[index].value = event.target.value
                              this.setState({
                                dataSrcObjects: dataSrcs
                              });
                            }
                          }}
                        />
                      </Row>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Row>
          <Row>
            <Button
              className="next_button"
              onClick={() => {
                this.setState(() => {
                  return {
                    doneWithComponent: true
                  }
                }, () => {
                  setTimeout(this.props.onNextButtonClick, 500);
                });
              }}
            >
              Next
            </Button>
          </Row>
        </Card>
      </Col>
      <Col s={0} m={1} l={6}></Col>
    </Row>
    );
  }
}

export default NumberOfDevices;
