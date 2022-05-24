const express = require("express");
const dataRouter = express.Router();
const Task = require("../models/task");

dataRouter.get('/files', (req, res, next) => {
    Task.find({user: req.user._id}, (err, tasks) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        const filesCount = {}
        tasks.forEach(task => {
            task.files.forEach(file => {
                if (filesCount[file]) {
                    filesCount[file] ++;
                } else {
                    filesCount[file] = 1
                }
            })
        })
        const filesData = Object.keys(filesCount).map(key => {
            return {file: key, changes: filesCount[key]}
        });
        return res.status(200).send(filesData)
    })
})

dataRouter.get('/tasks', (req, res, next) => {
    Task.find({user: req.user._id}, (err, tasks) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        const dataTasks = [
            {priority: "low", count: 0},
            {priority: "medium", count: 0},
            {priority: "high", count: 0},
        ]
        tasks.forEach(task => {
            switch (task.priority) {
                case "low":
                    dataTasks[0].count ++;
                    break;
                case "medium":
                    dataTasks[1].count ++;
                    break;
                case "high":
                    dataTasks[2].count ++;
                    break;
            }
        })
        return res.status(200).send(dataTasks)
    })
})

module.exports = dataRouter;