/* jshint node: true */
'use strict';

const {Payload} = require('dialogflow-fulfillment');
const Airtable = require('airtable');
const rp = require('request-promise');
const secret = require('../lib/secret');
const englishWelcome = "Hi! I'm the voice of San Miguel de Allende Mexico;";
const bienvenidaEspanol = "Hola, soy la voz de San Miguel de Allende;";





exports.getRequest = (endpoint) => {
       let options = {
              method: "GET",
              uri: endpoint
       };
       return rp(options)
};

exports.postRequest = (endpoint, data)=>{
  let options = {
         method: "POST",
         uri: endpoint,
         body : data,
         json: true // Automatically stringifies the body to JSON

  };
  return rp(options)
};

exports.randomWelcome = ()=>{
       let questions = ['How can I be of assistance?', 'You can ask me about events happening in town', 'How can I help you?', 'If you are a resident, you can create an account and pay municipal services and/or fines', 'You can ask me about air quality', 'You can report problems with municipal services'];
       let random = getRandom(0, questions.length-1);
       return '<speak>\n' +englishWelcome + "<break time='.5s'/>" + questions[random] + '</speak>';

};

exports.bienvenidaAleatoria = ()=>{
       let questions = ['¿Como te puedo asistir?',  '¿Como te puedo ayudar?',];
       let random = getRandom(0, questions.length-1);
       return  '<speak>\n' +bienvenidaEspanol + "<break time='.5s'/>" + questions[random] + '</speak>';

};



function getRandom(min, max) {
       return Math.floor(Math.random() * (max-min+1)+min);
}

exports.airtableGet =(table)=>{
       const base = new Airtable({apiKey: secret.AIRTABLE_API_KEY}).base('appksxfNahYgyL6Af');
       let response = "";
       return new Promise((resolve,reject)=>{
              base(table).select({
                     maxRecords: 10,
                     view: "Grid view"
              }).eachPage(function page(records) {
                     console.log(JSON.stringify(records,null, 2));
                     records.forEach(function(record) {
                            const puesto = record.get('Puesto');
                            const descripcion = record.get('Descripcion');
                            response = "<speak>Por supuesto, hay un puesto para: " + puesto + "<break time='.5s'/>" + descripcion +"</speak>";
                     });
                     console.log(response);
                     resolve(response);
              }, function done(err) {
                     if (err) {console.error(err);}
                     reject(err);
              });
       });
};

exports.airtablePost = (post) =>{
       const base = new Airtable({apiKey: 'keyo49Tl2tr4aROPa'}).base('appksxfNahYgyL6Af');
       let obj = {
              "fecha": "2018-09-20",
              "Queja": post
       };
       return new Promise((resolve, reject) =>{
              base('Quejas').create(obj, function(err, record) {
                     if (err) {
                            reject();
                            console.error(err);
                            return;
                     } else {
                            resolve();
                     }
                     console.log(record.getId());
              });
       });

};
