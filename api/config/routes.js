playerController = require('../controllers/playerController');
userController = require('../controllers/userController');

//Router
const express = require('express'),
      routes  = express.Router();
      ///////ROUTES////////
    //Routes for Users
    routes.post('/new_user', (req, res) => {
        userController.newUser(req, res);
    });
    routes.post('/login_user', (req, res) => {
        userController.loginUser(req, res);
    });
    routes.get('/get_user', (req, res) => {
        userController.getUser(req, res);
    });
    routes.get('/get_my_players', (req, res) => {
        userController.getMyPlayers(req, res);
    });
    routes.get('/logout', (req, res) => {
        userController.logoutUser(req, res);
    });
    //Routes for Player Objects
    routes.post('/new_player', (req, res) => {
        playerController.newPlayer(req, res);
    });
    routes.post('/get_player', (req, res) => {
        playerController.getPlayer(req, res);
    });
    routes.post('/update_player', (req, res) => {
        playerController.updateAndSave(req, res);
    });
    routes.post('/delete_player', (req, res) => {
        playerController.deletePlayer(req, res);
    });
    // //Routes for Campaign Objects
    // routes.post('/new_campaign', (req, res) => {
    //     campaignController.newCampaign(req, res);
    // });
    // routes.post('/get_campaign', (req, res) => {
    //     campaignController.getCampaign(req, res);
    // });
    // routes.post('/get_campaignById', (req, res) => {
    //     campaignController.getCampaignById(req, res);
    // });
    // routes.post('/add_player', (req, res) => {
    //     campaignController.addPlayer(req, res);
    // });
    // routes.post('/remove_player', (req, res)=>{
    //     campaignController.removePlayer(req, res);
    // });    
module.exports = routes;