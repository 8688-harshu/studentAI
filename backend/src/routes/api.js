const express = require('express');
const router = express.Router();
const ingestController = require('../controllers/ingestController');
const chatController = require('../controllers/chatController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/ingest', upload.single('file'), ingestController.ingestFile);
router.post('/chat', chatController.chat);

module.exports = router;
