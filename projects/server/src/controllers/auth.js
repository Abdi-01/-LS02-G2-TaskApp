const { dbConf, dbQuery } = require('../config/db');
const { hashPassword } = require('../confiG/encript')

module.exports = {
    getData: async (req, res) => {
        try {
            let dataUser = await dbQuery(`Select * from user`)
            res.status(200).send(dataUser)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    login: async (req, res) => {
        try {
            let { email, password } = req.body
            let loginUser = await dbQuery(`Select * from user WHERE email=${dbConf.escape(email)} and password=${dbConf.escape(password)}`)
            if (loginUser.length > 0) {
                res.status(200).send(loginUser)
            } else {
                res.status(500).send({
                    status: false,
                    message: `Login failed`
                })
            }
        } catch (error) {
            console.log(`error login`, error)
            res.status(500).send(error)

        }
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