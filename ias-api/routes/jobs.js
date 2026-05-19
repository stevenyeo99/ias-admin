const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.get('/', jobController.listJobs);
router.post('/', jobController.createJob);
router.get('/:jobId', jobController.getJob);

module.exports = router;
