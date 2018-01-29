import React, { Component } from 'react';
import { Card, Col, Row, Input, Button } from 'react-materialize';

import './CustomerContact.scss';

class CustomerContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offpage: true,
      doneWithComponent: false
    }
  }

  componentDidMount() {
    this.setState({
      offpage: false
    });
  }

  render() {
    return (
      <Row>
        <Col s={0} m={1} l={3}></Col>
        <Col s={12} m={10} l={6}>
          <Card
            title="Company Information"
            style={{ marginTop: '125px'}}
            className={this.state.offpage ? 'off_page' : 'on_page'}
            className={this.state.doneWithComponent ? 'dismiss' : null}
          >
            <Row>
              <Input
                s={12} m={12} l={12}
                label="Company Name"
              />
            </Row>
            <Row>
              <Input
                s={12} m={12} l={12}
                label="Company Contact Name"
              />
            </Row>
            <Row>
              <Input
                s={12} m={12} l={12}
                label="Company Contact Phone Number"
              />
            </Row>
            <Row>
              <Input
                s={12} m={12} l={12}
                label="Company Contact Email"
              />
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
                    setTimeout(() => this.props.onNextButtonClick(), 500);
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

export default CustomerContact;
