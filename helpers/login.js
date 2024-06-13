const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
var myArgs = process.argv.slice(2);

const repo = myArgs[0];
const data = require(`sso_account_data.json`);

// Declare a global variable to store the response
let guestToken;
let generatedToken = {};

async function login() {
  // set header value for guest token
  let headers = data.header;

  try {
    const responseGuestToken = await axios.get(`${process.env.ACCESS_GATEWAY_URL}/sso/v1/authorize`, { headers });
    guestToken = responseGuestToken.data.data.guest_token;
    
    generatedToken['guestToken'] = guestToken;

    // set header value for login
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${guestToken}`,
      'X-Lang': 'en'
    };
    for (var i = 0; i < data.account.length; i++) {

      const response = await axios.post(`${process.env.ACCESS_GATEWAY_URL}/sso/v1/login`, data.account[i], { headers });
      generatedToken[data.account[i].email] = response.data.data.access_token.value;
    }
    writeTokenFile(generatedToken);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to write JSON data to a file
async function writeTokenFile(jsonFile) {
  try {
    const filePath = `./helpers/token.json`;
    const jsonString = JSON.stringify(jsonFile);
    fs.writeFileSync(filePath, jsonString, null, 4);
    console.log('JSON data written to file:', filePath);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to make the POST request
login();