const express = require('express');
const router = express.Router();
const apiai = require('apiai');
const apiai_client = apiai(process.env.CLIENT_API_KEY || "testing");

router.post('/', (req, res) => {
  let query = req.body.query;
  let response = processRequest(query,(response) => {
    res.send(response);
  });
});

function processRequest(query,callback) {

  let request = apiai_client.textRequest(query , {
    sessionId: 'DUMMY_SESSION'
  });

  request.on('response', (response) => {
    if(response.result.metadata && response.result.metadata.intentName === "Default Fallback Intent"){
      callback({'source':'server','fallback':true});
    }else{
      callback(response.result);
    }
  });

  request.on('error', (error) => {
    callback("something went wrong");
  });

  request.end();

}

module.exports = router;
