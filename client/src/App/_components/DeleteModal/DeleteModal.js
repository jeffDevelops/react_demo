import React, { Component } from 'react';

import { Card, Row } from 'react-materialize';
import './DeleteModal.scss';

class DeleteModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div className="blur_effect"></div>
        <Card className="delete_modal"
          style={{position: 'fixed', top: '30vh', left: '0', right: '0', width: '50%', margin: 'auto', zIndex: '3'}}
          title="Delete this Data Source Question?"
          actions={
            [
              <a 
                onClick={(event) => {
                  this.props.dismissDeleteModal(event, true);
                }}
                style={{color: '#d50000'}} key="1" href="#"
              >
                Delete
              </a>
            ,
              <a onClick={(event) => this.props.dismissDeleteModal(event, false)} style={{color: '#4caf50'}} key="2" href="#">
                Keep
              </a>
            ]
        }>
          <Row>
            Deleting this data source question will remove it from the customer-facing questionnaire. Is this okay?
          </Row>
        </Card>
      </div>
    );
  }
}

export default DeleteModal;