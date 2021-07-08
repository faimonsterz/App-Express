const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {type : String, require: true, trim: true}, 
  photo: {type: String, default: 'nopic.png'},
  location: {
      lat: Number,
      lgn: Number
  }
},{//this pate is scema DB
    toJSON: {virtuals:true},
    timestamps: true,
    collection: 'shops'
});
// join one to many
shopSchema.virtual('menus', {
  ref: 'Menu', // link to model menu
  localField: '_id', // _id is field model shop in this file
  foreignField: 'shop' // shop is field model menu (fk)
})

const shop = mongoose.model('Shop', shopSchema);

module.exports = shop;