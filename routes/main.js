var express = require('express');
var router = express.Router();
const { runtime,fetchJson } = require('../lib')
__path = process.cwd()

router.get('/', async (req, res, next) => {

	let hits = await fetchJson('https://api.countapi.xyz/hit/api-alexa.herokuapp.com/visitor')

	res.json({
	status: true,
	creator: "Shefin",
	runtime: runtime(process.uptime()),
	visitor: hits.value

	})

})

module.exports = router
