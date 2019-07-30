const path = require('path');
const router = require('express').Router();

router.use((req,res) => {
    res.sendFile(path.join(__dirname,'../../Project1'));
});

export default router;