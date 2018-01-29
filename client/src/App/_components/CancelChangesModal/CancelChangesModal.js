import React, { Component } from 'react';

import { Card, Row } from 'react-materialize';
import './CancelChangesModal.scss';

class CancelChangesModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return(
      <div>
        <div className="blur_effect"></div>
        <Card className="cancel_modal"
          style={{position: 'fixed', top: '30vh', left: '0', right: '0', width: '50%', margin: 'auto', zIndex: '3'}}
          title="Unsaved Changes Will Be Lost"
          actions={
            [
              <a onClick={(event) => this.props.dismissCancelModal(event, false)} style={{color: '#4caf50'}} key="1" href="#">
                Yes
              </a>
            ,
              <a onClick={(event) => this.props.dismissCancelModal(event, true)} style={{color: '#d50000'}} key="2" href="#">
                No
              </a>
            ]
        }>
          <Row>
            Keep editing this data source question?
          </Row>
        </Card>
      </div>
    );
  }
}

export default CancelChangesModal;