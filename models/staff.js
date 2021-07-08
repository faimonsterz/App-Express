const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {type : String, require: true, trim: true}, 
  salary: {type: Number},
  created: {type: Date, default: Date.now}
},{
    collection: 'staffs'
});

const staff = mongoose.model('Staff', staffSchema);

module.exports = staff;