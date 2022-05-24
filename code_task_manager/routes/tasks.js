const express = require("express");
const taskRouter = express.Router();
const Task = require("../models/task");

taskRouter.route("/")
    .get((req, res, next) => {
        Task.find({user: req.user._id}, (err, tasks) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(tasks)
        })
    })
    .post((req, res, next) => {
        req.body.user = req.user._id
        const newTask = new Task(req.body)
        newTask.save((err, task) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(task)
        })
    })

taskRouter.route("/:taskId")
    .get((req, res, next) => {
        Task.findById(
            req.params.taskId,
            (err, task) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(task)
            }
        )
    })
    .put((req, res, next) => {
        Task.findOneAndUpdate(
            {_id: req.params.taskId},
            req.body,
            {new: true},
            (err, task) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(task)
            }
        )
    })
    .delete((req, res, next) => {
        Task.findByIdAndDelete(
            req.params.taskId,
            (err, task) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(task)
            }
        )
    })

module.exports = taskRouter;