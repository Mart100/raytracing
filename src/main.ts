import express from 'express'
import { AddressInfo } from 'net'

const app = express()

const defaultPort:Number = 3000

// redirect all trafic to /public directory
app.use('/', express.static(__dirname + '/public'))

// listen for requests on port
const server = app.listen(process.env.PORT || defaultPort, () => {


	let addressInfo = server.address() as AddressInfo
	let port:Number = addressInfo.port

  console.log('Factorie is running on port: ' + port)
});
