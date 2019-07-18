// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
/* jshint node: true */

'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
const {dialogflow,} = require('actions-on-google');

admin.initializeApp();


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


/***
 *  Creates endpoint for fullfilment for Google Assistant.
 *
 * @type {HttpsFunction}
 */

exports.smaFulfillment = functions.https.onRequest((request, response) => {

       const agent = new WebhookClient({request, response});
       const app = dialogflow({debug: true});

       console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
       console.log('Dialogflow Request body: ' + JSON.stringify(request.body, null, '\t'));


       // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
       // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

       // Run the proper function handler based on the matched Dialogflow intent name


       let intentMap = new Map();

       intentMap.set('air-quality', require('./intent-handlers/air-quality'));
       intentMap.set('job-hunting', require('./intent-handlers/job-hunting'));
       intentMap.set('report-text', require('./intent-handlers/report-text'));
       intentMap.set('trigger-swarm', require('./intent-handlers/trigger-swarm'));
       intentMap.set('handle_permission', require('./intent-handlers/handle_permission'));
       intentMap.set('Default Welcome Intent', require("./intent-handlers/default-welcome"));

       agent.handleRequest(intentMap);
});
