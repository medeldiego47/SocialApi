const rotuer = require('express').Router();
const router = require('./api');
const apiRoutes = require ('./api');

router.use('/api',apiRoutes);

router.use((req,res)=>{
    res.status(404).send('404 page not found');
});

module.exports = router;