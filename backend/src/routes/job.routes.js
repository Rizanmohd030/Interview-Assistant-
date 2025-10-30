const express = require('express');
const router = express.Router();
const jobFetcherService = require('../services/job-fetcher.service');

// GET /api/jobs/:jobRole
router.get('/:jobRole', async (req, res, next) => {
  try {
    const { jobRole } = req.params;
    const { location } = req.query;

    const jobData = await jobFetcherService.fetchJobDescription(
      jobRole,
      location
    );

    res.json(jobData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;