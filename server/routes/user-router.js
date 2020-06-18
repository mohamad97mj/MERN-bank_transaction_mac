const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();


router.post('/upload', UserCtrl.myUpload)
router.post('/transaction', UserCtrl.myPostTransaction)
router.get('/download', UserCtrl.myDownload)

module.exports = router;

