/* jshint node: true */
'use strict';

const build = require('../lib/build-responses');

module.exports = (agent) => {
       let conv = agent.conv();
       console.log(agent.query);
       return new Promise((resolve, reject)=>{

              build.airtablePost(agent.query)
                     .then(res =>{
                            conv.ask("Ya hemos registrado tu reporte, lo atenderémos lo más pronto posible");
                            agent.add(conv);
                            resolve();
                     }).catch( err =>{
                            conv.ask("Tuve un problema de conexión, inténtalo nuevamente.")
              })
       });
};