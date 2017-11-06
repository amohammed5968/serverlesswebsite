'use strict';
const fs = require('fs');
const ejs = require('ejs');
const app = require('express');
// var app = express();

module.exports.landingPage = (event, context, callback) => {
  
  console.log('Received event: ',
  JSON.stringify(event, null, 2));
  
     var fileName = './pages/index.ejs';
     console.log(fileName);

     fs.readFile(fileName, function(err, data){

      if (err)
      {
        const response = {
          statusCode:200,
          headers: {
                'Content-Type': 'text/html',
              },
              body: `<h1>Something went wrong try again</h1>`
        }
      }
      else{
         const html = ejs.render(data.toString());
        
         const response = {
          statusCode:200,
          headers: {
                'Content-Type': 'text/html',
              },
              body: html
        }
        callback(null, response);
      }
     
     });
};

module.exports.somescript = (event, context, callback) => {
  var fileName = './pages/somescript.js';
  if (event.queryStringParameters && event.queryStringParameters.name) {
    // dynamicHtml = `<p>Hey ${event.queryStringParameters.name}!</p>`;
    fileName = './pages/'+ event.queryStringParameters.name;
  }
  fs.readFile(fileName, function(err, data){
          if (err)
          {
            const response = {
              statusCode:200,
              headers: {
                    'Content-Type': 'text/html',
                  },
                  body: `<h1>Something went wrong try again</h1>`
            }
          }
          else{
             const script = data.toString();
            
             const response = {
              statusCode:200,
              headers: {
                    'Content-Type': 'text/javascript',
                  },
                  body: script
            }
            callback(null, response);
          }
        });
 };