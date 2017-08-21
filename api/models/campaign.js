var mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
    campaignTitle: String,
    campaignPassword: String,
    players: [{userEmail: String, character: {} }],
});
mongoose.model('campaign', campaignSchema);