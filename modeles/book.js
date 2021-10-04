const {Schema,model} = require('mongoose')
const file = require('../middleware/file')

const book = new Schema({
     name: {
         type: String,
         required: true
     },
    adress: String,
    names:String,
    year: String,
    counts: String,
    count: String,
    mat:String,
    page: String,
    work:String,
    genreId: {
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    },
    child: String,
    tel:Number,
    marrid: String,
    typem: String,
    namem:String,
    img: {
        type: String,
        required: true
    },
    yearmar: String,
    father: String,
    typef: String,
    yearfat: String,
    mather: String,
    typema: String,
    yearmat: String,
    text: String,
    yearmar:String,
    

})


module.exports = model('Book', book)