//Credential info are masked here  
var CONSUMER_KEY = ''; // consumer key = API key
var CONSUMER_SECRET = ''; //consumer secret = API secret key
var TOKEN = ''; 
var TOKEN_SECRET = '';

function run() {
  var service = getService();
  Logger.log(service.getCallbackUrl());
  var tweet = pickUpTweet(); 
  if (tweet == '') {
    Logger.log('Tweet could not be selected');
    return false; 
  }
  Logger.log('Tweet Selected : '+tweet);

  if (service.hasAccess()) {
    var url = 'https://api.twitter.com/1.1/statuses/update.json';
    var payload = {
      status: tweet
    };
    var response = service.fetch(url, {
      method: 'post',
      payload: payload
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
  } else {
    var authorizationUrl = service.authorize();
    Logger.log('Please recheck url: %s',
        authorizationUrl);
  }
} 

function doGet() {
  return HtmlService.createHtmlOutput(ScriptApp.getService().getUrl());
}

function reset() {
  var service = getService();
  service.reset();
}

function getService() {
  return OAuth1.createService('Twitter')
      .setConsumerKey(CONSUMER_KEY) 
      .setConsumerSecret(CONSUMER_SECRET) 
      .setAccessToken(TOKEN, TOKEN_SECRET) 

      .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
      .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
      .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')

      .setCallbackFunction('authCallback') 
}

function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success');
  } else {
    return HtmlService.createHtmlOutput('Failed');
  }
}

//Randomly choose one quote in a google sheet  
function pickUpTweet() {
  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1"); 
  if (targetSheet.getLastRow() == 1) { return "" } // No data in a sheet
  var cells = targetSheet.getRange(2, 2, targetSheet.getLastRow() - 1, 3).getValues();
  
  var index = Math.floor(Math.random() * (cells.length));
  var tweetText = "";
  tweetText = cells[index][0];
  return tweetText;
}