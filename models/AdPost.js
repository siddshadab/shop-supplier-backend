const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdPostSchema = new Schema({
    title:{
        type: String,
        default: ''
    },
    category:{
        type: String,
        default: ''
    },
    model:{
            type: String,
            default: ''
    },
    condition:{
        type: String,
        default: ''
    },
    price:{
        type: String,
        default: ''
    },
    description:{
        type: String,
        default: ''
    },
    sellerName:{
        type: String,
        default:''
    },
    soldCity:{
        type: String,
        default:''
    },
    phoneNum:{
        type: Number,
        default:''
    },
    productImage:{
        // data: Buffer, 
        // contentType: String    
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('AdPost', AdPostSchema);