var mysql = require("mysql");
let instance = null;
require('dotenv').config();

const pool = mysql.createConnection({
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB
});

let db = {};

db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM USERS`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);    
        })
    })
}

db.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM USERS WHERE id = ?`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        })
    })
}

db.tem = (floor) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM TEMP WHERE FLOOR = ?`, [floor], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        })
    })  
}

db.post = (id, gate_num, temperature) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO ENTRY_RECORD VALUES(?, ?, now(), ?)`, [id, gate_num, temperature], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        })
    })
}

db.entry = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ENTRY_RECORD`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);    
        })
    })
}

module.exports = db;