#! /usr/bin/env node

// This script is used to simulate a website with your plugin installed.

require('dotenv').config();

const express = require('express');
const appId = 'test';

const html = `
  <html>
    <head>
      <script>
        var openPrototype = XMLHttpRequest.prototype.open,
        interceptResponse = function(urlpattern, callback) {
          XMLHttpRequest.prototype.open = function() {
            arguments['1'].match(urlpattern) && this.addEventListener('readystatechange', function(event) {
              if (this.readyState === 4) {
                var response = callback(event.target.responseText);
                Object.defineProperty(this, 'response',     {writable: true});
                Object.defineProperty(this, 'responseText', {writable: true});
                this.response = this.responseText = response;
              }
            });
            return openPrototype.apply(this, arguments);
          };
        };

        interceptResponse(/api/i, function(response) {
          return JSON.stringify({
            "success":true,
            "message":"",
            "data":{
              "html": "http://localhost:3000/${process.env.REACT_APP_NINJA_PLUGIN_PATH}/viewer/${appId}",
              "isCrawler": false,
              "adsRemoval": true
            }
          });
        });
      </script>
      <script id="commonninja-script" src="https://cdn.commoninja.com/sdk/latest/commonninja.js"></script>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap" />
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          line-height: 1.5em; 
          font-family: Spartan, sans-serif;
          font-size: 16px;
        }
        .wrapper {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 40px;
        }
        h1 {
          text-align: center;
          line-height: 1.7em; 
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <h1>Touch my tail, I shred your hand purrrr...</h1>
        <p>
          Run up and down stairs cattt catt cattty cat being a cat murr i hate humans they are so annoying yet be a nyan cat, feel great about it, be annoying 24/7 poop rainbows in litter box all day hack. The cat was chasing the mouse poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls or pretend not to be evil, and ask to go outside and ask to come inside and ask to go outside and ask to come inside.
        </p>
        <div class="commonninja_component" comp-type="${process.env.REACT_APP_NINJA_PLUGIN_TYPE}" comp-id="${appId}"></div>
        <p>
          Jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water gnaw the corn cob stick butt in face, pretend not to be evil yet chase mice furball.
        </p>
      </div>
    </body>
  </html>
`;

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/', function (req, res) {
	res.send(html);
});

app.listen(port);

console.log('Simulator server started at http://localhost:' + port);
