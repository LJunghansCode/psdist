var mongoose = require('mongoose');
var User = mongoose.model('user');
var Player = mongoose.model('player');
var bcrypt = require('bcrypt');
var campaign = mongoose.model('campaign');
var session = require('express-session');


module.exports = (() => {
    const handleError = (err, res) => {
        console.log(err);
    };
    var PlayerController = {};
       PlayerController.newPlayer = (req, res) => {
            var sess = req.session;
            if(sess.user){
                var playerToMake = new Player(req.body.playerForm);
                playerToMake.experience = 0;
                playerToMake.level = 1;
                playerToMake.accountEmail = sess.user.email;
                sess.user.players.push(playerToMake);
                playerToMake.save((err) => {
                if (err) return handleError(err);
                res.json({data: playerToMake});
            });
            }else{
                res.status(404).send('Not Logged In');
            }           
            
        };
        PlayerController.getPlayer = (req, res) => {
            Player.findOne({_id: req.body.id}, (err, foundPlayer) => {
                if (err) {
                    res.json({error: err});
                    return handleError(err, res);
                }
                if (foundPlayer) {
                    res.json({data: foundPlayer});
                } else {
                    res.json({playerFound: false});
                }
            }); 
        };
        PlayerController.deletePlayer = (req, res) => {
            Player.findOneAndRemove({_id: req.body.id}, (err, foundPlayer) => {
                if (err) return handleError(err, res);
                if (foundPlayer) {
                    res.json({message: true});
                } else {
                    res.status(404).send('Couldnt Delete');
                }
            }); 
        };
        PlayerController.updateAndSave = (req, res) => {
                Player.findOneAndUpdate({_id: req.body.player.id}, req.body.player, (err, foundPlayer) => {
                if (err) {
                    return handleError(err, res);
                }
                if (foundPlayer) {
                    console.log(req.body.player)
                   foundPlayer.save();
                   res.json({data: foundPlayer});
                } else {
                    res.status(404).send('player not found');
                }
            });   
        };


    return PlayerController;

})();