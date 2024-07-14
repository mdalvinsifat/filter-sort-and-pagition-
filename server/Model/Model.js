const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    jobName: String,
    jobDetails: String,
    category: String,
    salary: Number,
    positions: Number
})

const Job = mongoose.model('Job', jobSchema);
module.exports = Job 