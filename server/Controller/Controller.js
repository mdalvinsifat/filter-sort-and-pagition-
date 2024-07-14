const Job = require("../Model/Model");

const createProduct = async (req, res) => {
    try {
        const newJob = await Job.create(req.body);
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};




// GET all jobs with filtering, sorting, and pagination
const Readprodut =  async (req, res) => {
    const { page = 1, limit = 10, sortField = 'jobName', sortOrder = 'asc', filterField, filterValue } = req.query;
    const skip = (page - 1) * limit;

    try {
        let query = {};

        if (filterField && filterValue) {
            query[filterField] = filterValue;
        }

        const jobs = await Job.find(query)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit));

        const totalCount = await Job.countDocuments(query);

        res.json({
            jobs,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const DeleteProduct =  async (req, res) => {
    const { id } = req.params;

    try {
        await Job.findByIdAndDelete(id);
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const UpdateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


module.exports = {UpdateProduct, Readprodut, DeleteProduct,createProduct }


