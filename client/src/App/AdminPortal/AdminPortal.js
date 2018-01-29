import React, { Component } from 'react';

import { Row, Col } from 'react-materialize';
import './AdminPortal.scss';

import CreateDataSource from '../_components/CreateDataSource/CreateDataSource';
import DataSourceIndex from '../_components/DataSourceIndex/DataSourceIndex';
import OnboardNewCustomer from '../_components/OnboardNewCustomer/OnboardNewCustomer';
import CancelChangesModal from '../_components/CancelChangesModal/CancelChangesModal';
import DeleteModal from '../_components/DeleteModal/DeleteModal';

const initialState = {
  shouldDisplayCancelModal: false,
  shouldDisplayDeleteModal: false,
  canDismissWriteMode: null,
  id: null
}

class AdminPortal extends Component {
  constructor(props) {
    super(props);

    this._handleCancel = this._handleCancel.bind(this);
    this._dismissCancelModal = this._dismissCancelModal.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._dismissDeleteModal = this._dismissDeleteModal.bind(this);

    this.state = initialState;
  }

  _handleCancel() {
    this.setState(() => {
      return {
        shouldDisplayCancelModal: true,
        canDismissWriteMode: false
      }
    }, () => document.body.style.overflow = 'hidden');
  }

  _dismissCancelModal(event, userDone) {
    event.preventDefault(); // don't scroll to the top of the page upon dismiss
    this.setState((prevState, props) => {
      return {
        shouldDisplayCancelModal: false,
        canDismissWriteMode: userDone
      }
    }, () => {
      document.body.style.overflow = 'auto';
      this.setState({
        canDismissWriteMode: null
      });
    });
  }

  _handleDelete(id) {
    this.setState(() => {
      return {
        id: id,
        shouldDisplayDeleteModal: true
      }
    }, () => document.body.style.overflow = 'hidden');
  }

  _dismissDeleteModal(event, canDelete) {
    event.preventDefault(); // don't scroll to the top of the page upon dismiss
    this.setState(() => {
      return {
        shouldDisplayDeleteModal: false
      }
    }, () => {
      document.body.style.overflow = 'auto';
      if (canDelete) {
        this.props.deleteDataSource(this.state.id)
          .then(() => {
            this.setState(initialState);
          });
      }
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {
          this.state.shouldDisplayCancelModal
            ? <CancelChangesModal
                dismissCancelModal={this._dismissCancelModal}
              />
            : null
        }
        {
          this.state.shouldDisplayDeleteModal
            ? <DeleteModal
                confirmDelete={this.props.deleteDataSource}
                dismissDeleteModal={this._dismissDeleteModal}
                id={this.state.id}
              />
            : null
        }
        <Row className="Admin_Portal"
          style={ this.state.shouldDisplayCancelModal ? {filter: 'blur(2px)'} : null}
        >
          <Col l={1} m={0} s={0} />
          <Col l={10} m={12} s={12} className="column">
            <OnboardNewCustomer
              className="Onboard_New_Customer"
            />
            <CreateDataSource
              createDataSource={this.props.createDataSource}
            />
            <DataSourceIndex
              dataSrcs={this.props.dataSrcs}
              handleCancel={this._handleCancel}
              keepEditing={this._keepEditing}
              dismissModal={this._dismissCancelModal}
              canDismissWriteMode={this.state.canDismissWriteMode !== null
                                    ? this.state.canDismissWriteMode
                                    : undefined}
              updateDataSource={this.props.updateDataSource}
              handleDelete={this._handleDelete}
            />
          </Col>
          <Col l={1} m={0} s={0} />
        </Row>
        <div className="background_accent"></div>
      </div>
    );
  }
}

export default AdminPortal;