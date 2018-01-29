/* jshint esversion: 6 */

const mongoose = require('mongoose');
const db = require('./models');
mongoose.Promise = Promise;

let masterDataSrcsList = [
  {
    dataSourceName: `source one`,
    estBytePerEvent: 10,
    avgEPS: 3,
    dataSourceName: `Windows Servers - HIGH EPS (~50 eps - 10% of total)`,
    estBytePerEvent: 800,
    avgEPS: 25,
    numOfDev: 3
  },
  {
    dataSourceName: `source two`,
    estBytePerEvent: 9,
    avgEPS: 5,
    dataSourceName: `Windows Servers - MED EPS (~3 eps - 50% of total)`,
    estBytePerEvent: 800,
    avgEPS: 3,
    numOfDev: 4
  },
  {
    dataSourceName: `source three`,
    estBytePerEvent: 8,
    avgEPS: 3,
    dataSourceName: `Windows Servers / Desktops - LOW EPS (~1 eps - 40% of total)`,
    estBytePerEvent: 800,
    avgEPS: 0.5,
    numOfDev: 5
  },
  {
    dataSourceName: `source four`,
    estBytePerEvent: 7,
    avgEPS: 1,
    dataSourceName: `Windows AD Servers`,
    estBytePerEvent: 800,
    avgEPS: 15,
    numOfDev: 2
  },
  {
    dataSourceName: `source five`,
    estBytePerEvent: 6,
    dataSourceName: `Network Routers`,
    estBytePerEvent: 200,
    avgEPS: 2,
    numOfDev: 0
  },
  {
    dataSourceName: `Network Switches`,
    estBytePerEvent: 200,
    avgEPS: 8,
    numOfDev: 0
  },
  {
    dataSourceName: `Network Wireless LAN`,
    estBytePerEvent: 200,
    avgEPS: 4,
    numOfDev: 0
  },
  {
    dataSourceName: `Network Load-Balancers`,
    estBytePerEvent: 200,
    avgEPS: 2,
    numOfDev: 0
  },
  {
    dataSourceName: `Other Network Devices`,
    estBytePerEvent: 200,
    avgEPS: 5,
    numOfDev: 0
  },
  {
    dataSourceName: `Network Firewalls (Cisco - Internal)`,
    estBytePerEvent: 250,
    avgEPS: 70,
    numOfDev: 0
  },
  {
    dataSourceName: `Network Firewalls (Check Point - DMZ)`,
    estBytePerEvent: 200,
    avgEPS: 0,
    numOfDev: 0
  },
  {
    dataSourceName: `Network Firewalls (Cisco - DMZ)`,
    estBytePerEvent: 200,
    avgEPS: 6,
    numOfDev: 0
  },
  {
    dataSourceName: `Network IPS / IDS`,
    estBytePerEvent: 1192,
    avgEPS: 2,
    numOfDev: 0
  },
  {
    dataSourceName: `Network VPN`,
    estBytePerEvent: 200,
    avgEPS: 3,
    numOfDev: 0
  },
  {
    dataSourceName: `Network AntiSpam`,
    estBytePerEvent: 970,
    avgEPS: 1,
    numOfDev: 0
  },
  {
    dataSourceName: `Network Web Proxy`,
    estBytePerEvent: 300,
    avgEPS: 1,
    numOfDev: 0
  },
  {
    dataSourceName: `Web Servers (IIS, Apache, Tomcat)`,
    estBytePerEvent: 300,
    avgEPS: 3,
    numOfDev: 0
  },
  {
    dataSourceName: `Database (MSSQL, Oracle, Sybase - indicate # of instances)`,
    estBytePerEvent: 1030,
    avgEPS: 14,
    numOfDev: 0
  },
  {
    dataSourceName: `Email Servers (Exchange, Sendmail, BES, etc)`,
    estBytePerEvent: 340,
    avgEPS: 2,
    numOfDev: 0
  },
  {
    dataSourceName: `ESXi`,
    estBytePerEvent: 250,
    avgEPS: 10,
    numOfDev: 0
  },
  {
    dataSourceName: `Linux`,
    estBytePerEvent: 200,
    avgEPS: 3,
    numOfDev: 0
  }
];

let dropAndSeedMasterDataSrcs = function() {
  return new Promise( (resolve, reject) => {
    db.MasterDataSrc.remove({}).then( () => {
      function asyncCreateDoc(doc) {
        return new Promise(resolveAsync => {
          db.MasterDataSrc.create(doc)
            .then(createdDoc => {
              console.log(createdDoc);
              resolveAsync();
            });
        });
      }
      let createInteractions = masterDataSrcsList.map(asyncCreateDoc);
      let createResults = Promise.all(createInteractions);
      createResults.then( () => {
        // console.log('DONE WITH CREATING DATASOURCES');
        resolve();
      }).catch(err => {
        console.log('WAS NOT ABLE TO CREATE ALL MASTER DATA SRCS', err);
        reject();
      });
    }).catch(err => {
      console.log('COULD NOT REMOVE ALL MASTER DATA SRCS' + err + ' \n \n \n \n \n \n \n \n');
      reject();
    });
  });
}

dropAndSeedMasterDataSrcs()
  .then( () => {
    console.log('MASTER DATA SRCS SEEDED!')
    process.exit();
  });
