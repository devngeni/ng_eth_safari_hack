# Ethsafari Exchange

This is a Web3 dApp The Dapp is a bridge that converts the Kenyan currency through Mpesa api to a crypto coin focussing on USDT which is a stable coin. 


# Cloning the project

One can clone the project through the link https://github.com/devngeni/ng_eth_safari_hack.git

# To run the client

```shell
node server.js
npm start
```

# How the Web dApp works

The user of the system accesses the URL on the browsers with an input form to fill in. The first input is an amount option, this is where the user is required to key in the value in Kenyan shilling to transact with. The next input is the user's phone number, this is the number the user will get a prompt message from Mpesa to enter their pin to validate payment. The last input is the wallet address where the user is required to have a wallet in order to deposit the converted amount once they hit the exchange button.  The connect wallet button allows the user to automatically add their Coin base wallet address once they have logged in or create a coin base wallet incase they do not have one. Once the user keys in all inputs and clicks on exchange, they are prompted by Mpesa to key in their pin and once the transaction has been validated, the information is saved on MongoDb.