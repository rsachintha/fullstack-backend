const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    _id: {
        type: String,
        required: [true, 'Please add a text value']
    },
    itemName: {
        type: String,
        required: [true, 'Please add a text value']
    },
    itemDesc: {
        type: String,
        required: [true, 'Please add a text value']
    },
    supplier: {
        type: String,
        required: [true, 'Please add a text value']
    },
    quantity: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)