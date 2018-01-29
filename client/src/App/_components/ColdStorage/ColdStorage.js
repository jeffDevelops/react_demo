import React, { Component } from 'react';
import { Col, Row, Card, Input, Button } from 'react-materialize';

import './ColdStorage.scss';

class ColdStorage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offPage: true
    }
  }

  componentDidMount() {
    this.setState({
      offPage: false
    });
  }

  render() {
    console.log(this.state.offPage);
    return (
      <Row style={{ height: '100%' }}>
        <Col s={0} m={1} l={3}></Col>
        <Col s={12} m={10} l={6}>
          <Card
            className={this.state.offPage ? 'off_page' : 'on_page'}
            style={{ marginTop: '125px'}}
            title="Cold Storage"
          >
          <Row>
            <p style={{ width: '97%', margin: '0 auto'}}
            >
              Select preferred cold storage duration:
            </p>
          </Row>
            <Row>
              <Input
                s={6} m={6} l={3}
                type='radio'
                value='0'
                label='0 Days'
                className='with-gap'
              />
              <Input
                s={6} m={6} l={3}
                type='radio'
                value='90'
                label='90 Days'
                className='with-gap'
              />
              <Input
                s={6} m={6} l={3}
                type='radio'
                value='180'
                label='180 Days'
                className='with-gap'
              />
              <Input
                s={6} m={6} l={3}
                type='radio'
                value='365'
                label='365 Days'
                className='with-gap'
              />
            </Row>
            <Row>
              <Button
                className="next_button"
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

export default ColdStorage;
