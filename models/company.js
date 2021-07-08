const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name:  String, 
  address: {
      province: String
  },
},{
    collection: 'companys'
});

const company = mongoose.model('Company', companySchema);

module.exports = company;