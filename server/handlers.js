 var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

var postMessage = function() {
  console.log('someone tried to post to /api/messages');
  client.sendMessage({
    to: process.env.toNum,
    from: process.env.fromNum,
    body: 'Walk the dogs!'
  })
  .then(function(response) {
    console.log('message sent', response);
  })
  .catch(function(err){
    console.log('err: ', err);
  });
};

module.exports = {
  postMessage: postMessage
}
