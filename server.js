const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var cors = require('cors')
let unirest = require('unirest');
var axios = require("axios");
const { btoa } = require('buffer');
const { request } = require('http');
app.use(express.static(path.join(__dirname, 'build')));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//stk-push
app.post("/api/mpesaPayment",async function (req, res) {
  // res.json({"amountKe": req.body.amountKsh, "amountUS": req.body.amountUsd, "phone": req.body.phone, "address": req.body.walletAddress});

  let phone = req.body.phone;
  let amount = req.body.amountKsh;
  // let wallet = req.body.walletAddress;

  //generate access token
  let client_credentials = Buffer.from("AnTOxMCA12d3R5OSk3CscMz7z5B4p2Hr:GVi1J5m2SwGd4zoh").toString("base64");    
  let url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

 
 let accessToken = async () => {
  try {
    
 const {data} = await axios.get(url, {
  headers: {
    'Authorization': 'Basic ' + client_credentials //the token is a variable which holds the token
  }})
  console.log({data})
  return data.access_token;
  } catch (error) {
    console.log(error);
    
  }
 };

 
//  await mpesaRegisterUrl(access_token);

    // generate password
    let date = new Date().toISOString().replace(/T/, '').replace(/-/g, '').replace(/:/g, '').replace(/\..+/, '');
    let passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";    
    let BusinessShortCode = 174379;
    let password = Buffer.from(BusinessShortCode + passkey + date).toString("base64");
    console.log("PASSKEY :- ", passkey)
    console.log("PASSWORD :- ", password)
    console.log("DATE :-", date)

    let url2 = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    await axios ({
      method: 'post',
      url: url2,
      headers: {
        'Content-Type': 'application/json',
      'Authorization':  'Bearer ' + await accessToken()
      },
      data:JSON.stringify({
        "BusinessShortCode": 174379,
        "Password": password,
        "Timestamp": date,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": 174379,
        "PhoneNumber": phone,
        "CallBackURL": "https://9c56-102-135-170-117.in.ngrok.io/callback",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Payment of USDT"
      })
    })
    .then((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    })
});


//callback url for database

app.post("/callback", function(req, res){
mode: "no-cors",
console.log("callback body ->", req.body);
});

//  async function mpesaRegisterUrl (){

// }

app.listen(process.env.PORT || 8080);
