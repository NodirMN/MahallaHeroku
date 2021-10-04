const {Schema,model} = require('mongoose')

const ironb = new Schema({
    namem: String,
    iron:Array,
    group: String,
    adress: String,
    name: {
        type: String,
        required: true
    },
    work: String,
    year: String,
    mat: String,
    tel: Number,
    count: {
        type: String,
        required: true
    },
    genreId: {
        type: Schema.Types.ObjectId,
        ref: 'Irong'
    },
    counts: String,
    child: String,
    marrid: String,
    text: String,
    typem: String,
    typef: String,
    typema: String,
    yearmar: String,
    father: String,
    yearfat: String,
    mather: String,
    img: String,
    page: String,
    type: String,
    yearmat: String,


})

module.exports = model('Ironb', ironb)