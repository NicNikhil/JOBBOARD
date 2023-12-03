import jobsModels from "../models/jobsModels.js";
import mongoose from "mongoose";
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
    //const jobs = await jobsModels.find({ createdBy: req.user.userId });
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
    if (!req.user.userId === job.createdBy.toString()) {
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

//==== DELETE JOBS =====

export const deleteJobController = async (req, res, next) => {
    const { id } = req.params;
    //find job
    const job = await jobsModels.findOne({ _id: id });
    //validation
    if (!job) {
        next(`No job found with this id ${id}`);
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('You are not authorize to delete this job');
        return;
    }
    await job.deleteOne();
    res.status(200).json({ message: 'Success, Job deleted' });
};
// ======== JOBS STATS AND FILTER =====
export const jobStatsController = async (req, res) => {
    const stats = await jobsModels.aggregate([
        // search by user jobs
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },
        },
        {
            $group: {
                _id: '$status', count: { $sum: 1 }
            },
        },
    ]);
    //default stats
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0
    }
    res.status(200).json({ totalJobs: stats.length, defaultStats });
};