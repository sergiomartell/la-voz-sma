/* jshint node: true */
'use strict';

const build = require('../lib/build-responses');
const secret = require('../lib/secret');

module.exports = (agent) => {
       let conv = agent.conv();
       return new Promise((resolve, reject)=>{
              build.airtableGet('Bolsa de Trabajo')
                     .then(response =>{
                            conv.ask(response);
                            agent.add(conv);
                            resolve();
                     })
       });
};