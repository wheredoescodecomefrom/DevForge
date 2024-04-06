const { Schema, Model } = require('mongoose');

const serverSchema = new Schema(
  {
    id: {type:String},
    groupid: {type:String},
    token: {type:String,default:'None'},
    rankPermsRole: {type:String},
    verifyChannel: {type:String},
  }
)