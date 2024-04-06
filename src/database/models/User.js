const { Schema, Model } = require('mongoose');

const userSchema = new Schema({
  id: {type:String},
  roblox_username: {type:String},
  verified: {type:Boolean,default:false},
  guild_id: {type:[String]},
  verificationToken: {type:String}
})