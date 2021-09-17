const express = require('express');
const router =  express.Router();

const DbService = require('../../DbService');
const userController = require('../controllers/userController');

let result;

router.get('/', (req, res, next) => {
    res.render('index');
 });

router.get('/1F/', (req, res, next) => {
    res.render('index_1f');
})

router.get('/2F/', (req, res, next) => {
    res.render('index_2f');
})

router.get('/3F/', (req, res, next) => {
    res.render('index_3f');
})

router.get('/4F/', (req, res, next) => {
    res.render('index_4f');
})

router.get('/users', (req, res) => {
    return res.json(users);
});

router.get('/users/:id', (req, res) => {
    result = users.find(u => u.id === parseInt(req.params.id));
    if (!users) res.status(404).send(`ID was not found`);
    res.send(result);
    return result;
});

//read - temperature
router.get('/getData', async (req, res, next) => {
    try{
        result = await DbService.all();
        res.json(result);
        console.log(result);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    return result;
});

router.get('/getEntry', async (req, res, next) => {
    try{
        result = await DbService.entry();
        res.json(result);
        console.log(result);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    return result;
});

router.get('/user/:id', async (req, res, next) => {
    try{
        result = await DbService.one(req.params.id); //url 파라미터 정보 조회
        //console.log(req.params.id);
        res.json(result);
        console.log(result);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    return result;
});

router.get('/temp/:id', async (req, res, next) => {
    try{
        result = await DbService.tem(req.params.id); //url 파라미터 정보 조회
        //console.log(req.params.id);
        res.json(result);
        console.log(result);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    return result;
})

//create - id, name, time, temperature
router.post('/post/:id/:gate/:temperature', (req, res) => {
    try{
        result = DbService.post(req.params.id, req.params.gate, req.params.temperature); //url 파라미터 정보 조회
        res.json(result);
        console.log(result);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    return result;
});

 module.exports = router;