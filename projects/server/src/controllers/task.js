const { dbConf, dbQuery } = require('../config/db');

module.exports = {
    getData: async (req, res) => {
        try {
            //console.log('iduser', req.params)
            if (req.params.status == 0){
                let dataTask = await dbQuery(`
                SELECT t.idtask, t.task_content, t.status_id, t.task_date, u.iduser, s.status_name FROM dbtodo_list.task t JOIN dbtodo_list.user u ON t.user_id = u.iduser 
                JOIN dbtodo_list.status s ON t.status_id = s.idstatus WHERE u.iduser = ${dbConf.escape(req.params.id)};`)
                res.status(200).send(dataTask)
            } else {
                let dataTask = await dbQuery(`
                SELECT t.idtask, t.task_content, t.status_id, t.task_date, u.iduser, s.status_name FROM dbtodo_list.task t JOIN dbtodo_list.user u ON t.user_id = u.iduser 
                JOIN dbtodo_list.status s ON t.status_id = s.idstatus WHERE u.iduser = ${dbConf.escape(req.params.id)} AND t.status_id = ${dbConf.escape(req.params.status)};`)
                res.status(200).send(dataTask)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    updateStatus: async (req, res) => {
        try {
            //console.log(req.body)
            await dbQuery(`UPDATE dbtodo_list.task SET status_id = ${dbConf.escape(req.body.status_id)} 
            WHERE idtask = ${dbConf.escape(req.body.idtask)};`);

            res.status(200).send({
                success: true,
                message: 'STATUS UPDATED'
            })
        } catch (error){
            console.log(error)
            res.status(500).send(error)
        }
    },
    deleteTask: async (req, res) => {
        try{
            console.log(req.params)
            await dbQuery(`DELETE FROM dbtodo_list.task WHERE user_id = ${dbConf.escape(req.params.id)} AND status_id = 3;`)
            
            res.status(200).send({
                success: true,
                message: 'TASKS DELETED'
            })
        } catch (error){
            console.log(error)
            res.status(500).send(error)
        }
    }
}