const { Schema, model } = require('mongoose');

const serverSchema = new Schema(
  {
    id: {type:String},
    groupid: {type:String},
    token: {type:String,default:'None'},
    cookieSet: {type:Boolean,default:false},
    rankPermsRole: {type:String},
    verifyChannel: {type:String},
    logChann: {type:String}
  }
)


module.exports = model('serverModel', serverSchema);