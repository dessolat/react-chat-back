const { Router } = require('express');

router = new Router();

router.get('/', (req, res) => {
	res.send('OK!')
})

module.exports = router