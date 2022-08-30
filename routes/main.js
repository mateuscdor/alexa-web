var express = require('express');
var router = express.Router();
const { runtime, getJson, startAlexa } = require('../lib')
__path = process.cwd()

router.get('/', async (req, res, next) => {

	let hits = await getJson('https://api.countapi.xyz/hit/api-alexa-bot.herokuapp.com/visitor')

	res.json({
	status: true,
	creator: "Shefin",
	runtime: runtime(process.uptime()),
	visitor: hits.value

	})

})

router.get('/md', (req, res) => {
    startAlexa();
    res.sendFile(__path + '/view/md.html')
})

module.exports = router
