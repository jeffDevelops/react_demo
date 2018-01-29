import React, { Component } from 'react';

import DataSource from '../DataSource/DataSource';

import { Card, Row, Button } from 'react-materialize';
import './DataSourceIndex.scss';

class DataSourceIndex extends Component{
  constructor(props) {
    super(props);

    this.state = {}

  }

  render() {
    console.log(this.props.dataSrcs);
    let dataSrcs = this.props.dataSrcs;
    return(
      <Card
        className="data_source_index_card"
        title="Current Scoping Questions"
      >
        <table className="striped">
          <thead>
            <tr>
              <th style={{width: '48%', paddingLeft: '10px'}}>Data Source</th>
              <th style={{width: '2%'}}></th>
              <th style={{width: '13%'}}>
                Bytes Per Event
              </th>
              <th style={{width: '2%'}}></th>
              <th style={{width: '15%'}}>Events Per Second</th>
            </tr>
          </thead>
          <tbody>
            {
              dataSrcs.map((datasrc, index) => { 
                return ( 
                  <DataSource key={index} 
                    dataSrc={datasrc}
                    handleCancel={this.props.handleCancel}
                    canDismissWriteMode={this.props.canDismissWriteMode !== null
                                          ? this.props.canDismissWriteMode
                                          : undefined}
                    updateDataSource={this.props.updateDataSource}
                    handleDelete={this.props.handleDelete}
                  />
                );
              })
            }
          </tbody>
        </table>
      </Card>
    );
  }
}

export default DataSourceIndex;