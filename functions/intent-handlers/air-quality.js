/* jshint node: true */
'use strict';

const build = require('../lib/build-responses');
const secret = require('../lib/secret');

module.exports = (agent) => {
       let conv = agent.conv();
       let endpoint = "https://api.breezometer.com/baqi/?lat=20.91421&lon=-100.743807&key="+ secret.BREEZOMETER_API_KEY;
       return new Promise((resolve, reject)=>{
              build.getRequest(endpoint)
                     .then(res=>{
                            let object = JSON.parse(res);
                            console.log(typeof res);
                            let response =  object.breezometer_description + "<break time='.5s'/>" + object.dominant_pollutant_text.main;
                            if(agent.locale === 'en-us'){
                                   console.log('English --------------------------->>>>>');
                                   conv.ask("<speak> According to Breezometer: Currently in San Miguel de Allende Centro there is "+response + '</speak>');
                                   agent.add(conv);
                                   resolve();
                            }
                            if(agent.locale === 'es-419' || agent.locale === 'es-MX' || agent.locale === 'es-US'){
                                   console.log('Español --------------------------->>>>>');
                                   conv.ask("<speak> De acuerdo con Breezometer: Actualmente en el centro de San Miguel de Allende hay : "+response + '</speak>');
                                   agent.add(conv);
                                   resolve();
                            }
                     })
                     .catch(err=>{
                            console.error(err);
                            resolve(err);
                            reject();
                     });
       });
};