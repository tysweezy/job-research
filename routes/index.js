var express = require('express');
var Job = require('../models/job');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var jobs = Job.find({}, function(err, job) {
    if (err) return handleError(err); 
    res.render('index', { title: 'Job Research!', job: job });
  });
});

/* GET new job page */
router.get('/job/new', function(req, res, next) {
    res.render('job_new', {title:  'Post new job'});
});

/**  POST add new job 
  *
  * @todo Validation!!!!!!!!!
**/
router.post('/job/new', function(req, res, next) {
  // validation 
  req.checkBody('title', 'Title field is required').notEmpty();
  // also todo..check if link is actually a valid URL.
  req.checkBody('application_link', 'Application URL is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render('job_new', { title: 'Post new job', errors: errors});
    return;
  }
  
  var job = new Job({
    title: req.body.title,
    applicaiton_link: req.body.applicaiton_link,
    job_type: req.body.job_type,
    language_or_stack: req.body.language,
    notes: req.body.notes,
  });

  job.save(function(err) {
    if (err) return handleError(err);
  });
  res.redirect('/');
});

module.exports = router;
