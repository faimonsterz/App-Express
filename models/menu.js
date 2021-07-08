const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = Schema({
    name: {type : String, require: true, trim: true}, 
    price: {type : Number},
    shop: {type: Schema.Types.ObjectId, ref: 'Shop'} // join table many to one (ref: 'Shop' === const shop = mongoose.model('Shop', shopSchema) in model)

},{//this pate is Schema DB
    toJSON:{ virtuals: true},
    timestamps: true,
    collection: 'menus'
});
// creat virtual data it not have in current DB
menuSchema.virtual('price_vat').get(function (){
    return (this.price*0.07) + this.price;
})

const menu = mongoose.model('Menu', menuSchema);

module.exports = menu;