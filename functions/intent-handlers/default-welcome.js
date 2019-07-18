/* jshint node: true */
'use strict';

const build = require('../lib/build-responses');
const {Permission} = require('actions-on-google');

module.exports = (agent) => {
       let conv = agent.conv();
       console.log('>>>>>>>>>>>>>>>>>>>>>> Locale >>>>>>>>>>>>>>>>>>>>>' + agent.locale);

       return new Promise((resolve, reject)=>{
              if(agent.locale === 'en-us'){
                     console.log('English --------------------------->>>>>');
                     conv.ask(build.randomWelcome());
                     /*conv.ask(new Permission({
                            context: "Hello, I am the virtual host for the city of San Miguel de Allende, to better serve you, ",
                            permissions: 'DEVICE_PRECISE_LOCATION',
                     }));*/
                     agent.add(conv);
                     resolve();
              }
              if(agent.locale === 'es-419' || agent.locale === 'es-MX' || agent.locale === 'es-US'){
                     console.log('Español --------------------------->>>>>');
                     conv.ask(build.bienvenidaAleatoria());
                     /*conv.ask(new Permission({
                            context: "Soy la voz de San Miguel de Allende, para poder ayudarte mejor",
                            permissions: 'DEVICE_PRECISE_LOCATION',
                     }));*/
                     agent.add(conv);
                     resolve();
              } else {
                     console.log('Defaulting to English --------------------------->>>>>');
                     conv.ask(build.randomWelcome());
                     agent.add(conv);
                     resolve();
              }
       });
};