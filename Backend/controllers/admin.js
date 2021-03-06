const connectdb = require('../connectdb');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const ModModels = require ('../Models/admin');

let modModels = new ModModels();

exports.getAllPosts = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const mod = decodedToken.admin;
    if(mod == 1){
        modModels.getAllPosts()
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    }else{
        res.status(400).json({error: 'Request unavailable'})
    }
}
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const mod = decodedToken.admin;
    if(mod == 1){
        console.log (req.params.id);
        console.log (req.body);

        let postId = req.params.id;
        let sqlInserts = [postId];
        modModels.deletePost(sqlInserts)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    }else{
        res.status(400).json({error: 'Request unavailable'})
    }
}
exports.getAllComments = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const mod = decodedToken.admin;
    if(mod == 1){
        modModels.getAllComments()
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    }else{
        res.status(400).json({error: 'Request unavailable'})
    }
}
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const mod = decodedToken.admin;
    if(mod == 1){
        
        console.log (req.params.id);
        console.log (req.body);
        let commentId = req.params.id;
        let sqlInserts = [commentId];
        modModels.deleteComment(sqlInserts)
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    }else{
        res.status(400).json({error: 'Request unavailable'})
    }
}