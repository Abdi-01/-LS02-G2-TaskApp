const { dbConf, dbQuery } = require('../config/db');

module.exports = {
    getTask: async (req, res) => {
        try {
            let getTask = await dbQuery(`Select * from task`)
            res.status(200).send(getTask)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    addTask: async (req, res) => {
        try {
            let addTask = await dbQuery(`insert into task(task_content,status_id,user_id) values ("${req.body.task}","${req.body.status}","${req.body.iduser}");`)
            if (addTask.insertId) {
                res.status(200).send({
                    success: true,
                    message: 'Add Task Success'
                });
            }
        } catch (error) {
            console.log('Error query :', error);
            res.status(500).send(error);
        }
    }
}