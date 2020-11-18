const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserModels {
    constructor() {
    }

    signup(sqlInserts){
        let sql = 'INSERT INTO users VALUES(NULL, ?, ?, ?, ?, NULL)';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) reject({error : 'Error in the Sign In! Please Login'});
                resolve({message : 'Sign Up completed with Success!'})
            })
        })
    }

    login(sqlInserts, password){
        let sql = 'SELECT * FROM users WHERE email = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) reject({ err });
                if (!result [0]){
                    reject ({ error : 'User email not found'});
                } else {
                    bcrypt.compare(password, result[0].password) 
                        .then(valid => { 
                            if (!valid) return reject({ error: 'Password is incorrect' });
                            resolve({
                                userId: result[0].userId,
                                token: jwt.sign(
                                    { userId: result[0].userId,
                                    admin: result[0].admin },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' } 
                                ),
                                admin: result[0].admin
                            });
                        })
                        .catch(error => reject({ error }));
                }
            })
        
        })
    }

    seeMyProfile(sqlInserts){
        let sql = 'SELECT firstName, lastName, email FROM users WHERE userId = ?';
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) {
                    return reject({error : 'Request unavailable'});
                } else {
                    resolve(result);
                }
            }) 

        })
    }

    updateUser(sqlInserts){
        let sql = 'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE userId = ?';
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) return reject({error : error});
                resolve({message : 'updated information'});
            }) 

        })
    }

    deleteUser(sqlInserts){
        let sql = 'DELETE FROM users WHERE userId = ?'; 
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) return reject({error : error});
                resolve({message : 'User deleted'});
            }) 

        })
    
    }
}

module.exports = UserModels;