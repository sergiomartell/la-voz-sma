/* jshint node: true */
'use strict';

const build = require('../lib/build-responses');
const secret = require('../lib/secret');

let payload = {
       "messageID": "d8ac8594-40b5-4a4a-90a2-437fc18decee",
       "messageType": "swarmMessageType",
       "fromUserID": "edUoOlx5WdNDn2k9JAmtzzhqcy12",
       "toID": "-1",
       "ownerName": "Search 'n Destroy",
       "fromFbUserID": "edUoOlx5WdNDn2k9JAmtzzhqcy12",
       "latitude": 20.907491,
       "longitude": -100.707228,
       "fbSwarmID": "-LMrb49Gqv0h54Y439SR",
       "locality": "ChIJHTfBRftRK4QR0XtXxyyCHtw",
       "userPID": "fVDny3FJMRw:APA91bEPS1T2IMva3fOJdGFPwUHnKizR8NTZvCUorUTsHIn50mfd9PV_TDzLA9c3xD663ztJzycpiSX2zl9DHHKoGmMvDwVeCFjivovu5e0fQgj30ruDAwSMCukCokxMc5jEuptR9Sdb"
};

let uri = "https://us-central1-teem-1071.cloudfunctions.net/teemDispatch";

module.exports = (agent) => {
       let conv = agent.conv();
       return new Promise((resolve, reject)=>{
              build.postRequest(uri, payload)
                     .then(response =>{
                            conv.ask("Hemos detonado un enjambre, de la aplicación teem, se le ha notificado a gente cerca de tí sobre tu emergencia y se genero un incidente con seguridad pública, te recomiendo descargues la aplicación teem en www.teem.is");
                            agent.add(conv);
                            resolve();
                     })
                     .catch(err=>{

                            conv.ask("Tuve un error al contactar a teem");
                            agent.add(conv);
                            throw new Error('error : ' + err);
                     })
       });
};