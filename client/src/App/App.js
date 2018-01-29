import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CustomerFacing from './CustomerFacing/CustomerFacing';
import AdminPortal from './AdminPortal/AdminPortal';

import axios from 'axios';
import { API_ROOT } from './_environments/environments';
import CreateDataSource from './_components/CreateDataSource/CreateDataSource';

class App extends Component {
  constructor(props) {
    super(props);

    this._getAllDataSources = this._getAllDataSources.bind(this);
    this._createDataSource = this._createDataSource.bind(this);
    this._updateDataSource = this._updateDataSource.bind(this);
    this._deleteDataSource = this._deleteDataSource.bind(this);

    this.state = {
      dataSrcs: []
    }

    this.url = `${API_ROOT}/master_data_srcs`;
  }

  // HTTP
  _getAllDataSources() {
    return axios.get(this.url)
      .then(response => {
        response.data.sort((a, b) => {
          return a.dataSourceName.toLowerCase().localeCompare(b.dataSourceName.toLowerCase());
        });
        this.setState({ dataSrcs: response.data });
      })
      .catch(error => console.log(error));
  }

  _createDataSource(serializedInputs) {
    console.log(serializedInputs);
    return new Promise((resolve, reject) => {
      return axios.post(this.url, {
          dataSourceName: serializedInputs.dataSourceName,
          estBytePerEvent: serializedInputs.estBytePerEvent,
          avgEPS: serializedInputs.avgEPS
        })
        .then(response => {
          let newArray = this.state.dataSrcs.concat(response.data);
          newArray.sort((a, b) => {
            return a.dataSourceName.toLowerCase().localeCompare(b.dataSourceName.toLowerCase());
          });
          this.setState({
            dataSrcs: newArray
          });
          resolve();
        }).catch(error => {
          console.log(error);
          reject();
        });
    });
  }

  _updateDataSource(serializedInputs) {
    return new Promise((resolve, reject) => {
      return axios.put(`${this.url}/${serializedInputs._id}`, serializedInputs)
        .then((response) => {
          let dataSrcs = this.state.dataSrcs;
          let dataSrcToUpdate;
          for (let i = 0; i < dataSrcs.length; i ++) {
            if (dataSrcs[i]._id === serializedInputs._id) {
              dataSrcToUpdate = i;
              break;
            }
          }
          dataSrcs.splice(dataSrcToUpdate, 1, response.data);
          this.setState(() => {
            return { dataSrcs: dataSrcs }
          }, resolve);
        }).catch(error => {
          console.log(error);
          reject();
        });
      });
  }

  _deleteDataSource(id) {
     return new Promise((resolve, reject) => {
       return axios.delete(`${this.url}/${id}`)
        .then(response => {
          console.log(response);
          let dataSrcs = this.state.dataSrcs;
          let dataSrcToDelete;
          dataSrcs.forEach((src, index) => {
            if (src._id === id) {
              dataSrcToDelete = index;
            }
          });
          dataSrcs.splice(dataSrcToDelete, 1);
          this.setState(() => {
            return { dataSrcs: dataSrcs }
          }, resolve);
        }).catch(error => {
          console.log(error); 
          reject();
        });
     });
  }
  
  componentDidMount() {
    this._getAllDataSources();
  }

  render() {
    console.log('APP STATE CHANGED -----------------------');
    console.log(this.state.dataSrcs);
    return(
      <BrowserRouter>
        <main style={{ minHeight: '100%' }}>
          <Route path="/admin" exact
            render={(props) => (
              <AdminPortal
                style={{ height: '100%'}}
                dataSrcs={this.state.dataSrcs} 
                createDataSource={this._createDataSource}
                updateDataSource={this._updateDataSource}
                deleteDataSource={this._deleteDataSource}
              />
            )}
          />
          <Route path="/" 
            render={(props) => (
              <CustomerFacing 
                style={{ height: '100%'}}
                dataSrcs={this.state.dataSrcs} 
              />
            )}
          />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;