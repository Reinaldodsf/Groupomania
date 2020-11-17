const jwt = require('jsonwebtoken');
const connectdb = require('../connectdb');
const mysql = require('mysql');

module.exports = (req, res, next) => {
    try {
        //extract the token from the incoming request Authorization header
        const token = req.headers.authorization.split(' ')[1];
        //verify function to decode our token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //for production, replaced with a much longer random string
        //extract the user ID from the token
        const idUser = decodedToken.userId;
        let sqlInserts = [idUser];
        let sql = 'SELECT COUNT(userId) FROM users WHERE userId=?';
        sql = mysql.format(sql, sqlInserts); 
        connectdb.query(sql, function(err, result){
            if (err) reject({error : 'User not signed in!'});
            if (result[0]['COUNT(userId)'] !== 1) {
                console.log ('Invalid Token');
            } else {
                next();
            }
        })
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée!'})
    }
};