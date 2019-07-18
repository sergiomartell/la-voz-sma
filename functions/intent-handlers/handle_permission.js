/* jshint node: true */
'use strict';

const build = require('../lib/build-responses');

module.exports = (agent, params, confirmationGranted) => {
       console.log(confirmationGranted + " <-----permissionGranted");
       console.log(params + "<------- params");
       let conv = agent.conv();
       console.log(JSON.stringify(conv,null,2));
       if (!conv.user.permissions) {
              throw new Error('Permission not granted');
       }
       const {requestedPermission} = conv.user.permissions[0];
       console.log(JSON.stringify(conv.user, null,2));
       /*if (requestedPermission === 'NAME') {
              conv.user.storage.name = conv.user.name.display;
              return conv.close(responses.sayName(conv.user.storage.name));
       }*/
       /*if (requestedPermission === 'DEVICE_COARSE_LOCATION') {
              // If we requested coarse location, it means that we're on a speaker device.
              conv.user.storage.location = conv.device.location.city;
              return showLocationOnScreen(conv);
       }*/
       if (requestedPermission === 'DEVICE_PRECISE_LOCATION') {
              // If we requested precise location, it means that we're on a phone.
              // Because we will get only latitude and longitude, we need to
              // reverse geocode to get the city.
              const {coordinates} = conv.device.location;
              console.log(confirmationGranted, + coordinates);
              conv.ask('Gracias por permitirme acceder a tu locación, ahora '+build.bienvenidaAleatoria());
              agent.add(conv);
       }
       throw new Error('Unrecognized permission');
};