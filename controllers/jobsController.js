import jobsModels from "../models/jobsModels.js";
// ==== Create Job ===== 
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body;
    if (!company || !position) {
        next('Please Provide All Fields');
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModels.create(req.body);
    res.status(201).json({ job });
};
// =====GET JOBS=====
export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModels.find({ createdBy: req.user.userId });
    res.status(200).json({
        totalJobs: jobs.length,
        jobs,

    });
};
//==== UPDATE JOBS =====
export const updateJobController = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body
    if (!company || !position) {
        next('Please Provide All Fields')
    }
    //find job
    const job = await jobsModels.findOne({ _id: id })
    //validation
    if (!job) {
        next(`no jobs found with this id ${id}`)
    }
    if (req.user.userId === job.createdBy.toString()) {
        return
        next('You are not authorized to update this job')
    }
    const updateJob = await jobsModels.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
    });
    //res
    res.status(200).json({ updateJob });

};