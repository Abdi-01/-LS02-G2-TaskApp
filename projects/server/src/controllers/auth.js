const { dbConf, dbQuery } = require('../config/db'); // bertipe async
const { hashPassword } = require('../config/encript')

module.exports = {
    getData: (req, res) => {
        dbConf.query(`select * from user;`,
            (err, results) => {
                if (err) {
                    console.log('Error query :', err);
                    res.status(500).send(err);
                } else {
                    console.log('Results SQL', results);
                    res.status(200).send(results);
                }
            })
    },
    register: async (req, res) => {
        try {
            let sqlInsert = await dbQuery(`insert into user(email,password) values ("${req.body.email}","${hashPassword(req.body.password)}");`)
            if (sqlInsert.insertId) {
                res.status(200).send({
                    success: true,
                    message: 'Register Success'
                });
            }
        } catch (error) {
            console.log('Error query :', error);
            res.status(500).send(error);
        }
    }
}