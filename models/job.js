var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    title: String,
    application_link: String,
    no_go: {type: Boolean, default: false},
    job_type: String,
    language_or_stack: String,
    notes: String
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;