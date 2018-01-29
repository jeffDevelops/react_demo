import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button, Icon, Input} from 'react-materialize';
import './DataSource.scss';

class DataSource extends Component {
  constructor(props) {
    super(props);

    this._handleEdit = this._handleEdit.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleCancel = this._handleCancel.bind(this);

    this.state = {
      mode: 'READ',
      nameInput: this.props.dataSrc.dataSourceName,
      BPEInput: this.props.dataSrc.estBytePerEvent,
      EPSInput: this.props.dataSrc.avgEPS,
      mongoId: this.props.dataSrc._id
    }
  }

  componentWillReceiveProps() {
    // User closed the modal and doesn't wish to save changes
    if (this.props.canDismissWriteMode === true) {
      this.setState({
        mode: 'READ'
      });
    }
  }

  _handleEdit() {
    console.log(this.props.dataSrc.dataSourceName, 'EDIT BUTTON CLICKED');
    this.setState({
      mode: 'WRITE',
      confirmDisplayed: false
    });
  }

  _handleUpdate() {
    console.log(this.props.dataSrc.dataSourceName, 'UPDATING...........PSYCH!');
    // grab this.state.<name/BPE/EPS>Input and update
    let serializedInputs = {
      dataSourceName: this.state.nameInput,
      estBytePerEvent: this.state.BPEInput,
      avgEPS: this.state.EPSInput,
      _id: this.state.mongoId
    }
    this.props.updateDataSource(serializedInputs)
      .then(() => {
        console.log('SETTING WRITE BACK TO READ');
        this.setState(() => {
          return {
            mode: 'READ'
          }
        }, () => {
          console.log('DONE SETTING TO READ.');
          console.log(this.state);
        });
      });
  }

  _handleDelete() {
    console.log(this.props.dataSrc._id, 'DELETE BUTTON CLICKED');
    this.props.handleDelete(this.props.dataSrc._id);
    // this.props.deleteDataSource(this.props.dataSrc._id);
  }

  _handleCancel() {
    // cache smaller variable names for readable condition and less access time
    console.log(this.props.dataSrc);
    const nameInput = this.state.nameInput;
    const apiName = this.props.dataSrc.dataSourceName
    const BPEInput = this.state.BPEInput;
    const apiBPE = this.props.dataSrc.estBytePerEvent;
    const EPSInput = this.state.EPSInput;
    const apiEPS = this.props.dataSrc.avgEPS;

    // If no changes have been made to any inputs, it's safe to just go back to READ mode
    if (nameInput === apiName && BPEInput === apiBPE && EPSInput === apiEPS) {
      this.setState({
        mode: 'READ'
      });
    //Otherwise, confirm with user that cancelling their changes won't be persisted
    } else {
      this.props.handleCancel();
    }
  }

  render() {
    const dataSrc = this.props.dataSrc;
    const mode = this.state.mode;
    let nameInput = this.state.nameInput;
    let BPEInput = this.state.BPEInput;
    let EPSInput = this.state.EPSInput;
    let nameInputProps;
    let BPEInputProps;
    let EPSInputProps;
    let saveButtonProps;
    const confirmDisplayed = this.state.confirmDisplayed;

    switch(mode) {
      case 'WRITE':

        if (nameInput.trim() === '') {
          console.log("invalid");
          nameInputProps = {
            error: "This field must not be empty."
          }
        } else {
          nameInputProps = {}
        }

        if (BPEInput === null || BPEInput === '') {
          console.log("invalid");
          BPEInputProps = {
            error: "This field must not be empty."
          }
        } else {
          BPEInputProps = {}
        }

        if (EPSInput === null || EPSInput === '') {
          console.log("invalid");
          EPSInputProps = {
            error: "This field must not be empty."
          }
        } else {
          EPSInputProps = {}
        }

        console.log(nameInputProps);
        console.log(EPSInputProps);
        console.log(BPEInputProps);


        if (!this.state.nameInput || !this.state.BPEInput || !this.state.EPSInput) {
          saveButtonProps = {
            disabled: true
          }
        } else {
          saveButtonProps = {
            disabled: false
          }
        }

        return (
          <tr>
            <td className="indent">
              <Input
                {...nameInputProps}
                label="Data Source Name"
                minLength={1}
                defaultValue={dataSrc.dataSourceName}
                onChange={(event) => this.setState({ nameInput: event.target.value })}
              />
            </td>
            <td></td>
            <td className="indent">
              <Input
                {...BPEInputProps}
                label="Bytes Per Event"
                type="number"
                minLength={1}
                defaultValue={dataSrc.estBytePerEvent}
                onChange={(event) => this.setState({ BPEInput: event.target.value })}
              />
            </td>
            <td></td>
            <td className="indent">
              <Input
                {...EPSInputProps}
                label="Events Per Second"
                type="number"
                minLength={1}
                defaultValue={dataSrc.avgEPS}
                onChange={(event) => this.setState({ EPSInput: event.target.value })}
              />
            </td>
            <td style={{ width: '5%' }}>
              <Button
                {...saveButtonProps}
                style={{ float: 'right' }}
                onClick={this._handleUpdate}
                className="green smaller_btn"
              >
                <Icon>save</Icon>
              </Button>
            </td>
            <td style={{ width: '5%'}}>
              <Button
                onClick={this._handleCancel}
                className="smaller_btn"
              >
                <Icon>replay</Icon>
              </Button>
            </td>
          </tr>
        );
     case 'READ':
        return (
          <tr>
            <td className="indent">{dataSrc.dataSourceName}</td>
            <td></td>
            <td>{dataSrc.estBytePerEvent}</td>
            <td></td>
            <td>{dataSrc.avgEPS}</td>
            <td className="button_td">
              <Button
                style={{ float: 'right' }}
                onClick={this._handleEdit}
                className="smaller_btn"
              >
                <Icon>edit</Icon>
              </Button>
            </td>
            <td className="indent button_td">
              <Button
                style={{ float: 'right' }}
                onClick={this._handleDelete}
                className="smaller_btn red accent-4"
              >
                <Icon>delete_forever</Icon>
              </Button>
            </td>
          </tr>
        );
      default:
        return null;
    }
  }
}

export default DataSource;