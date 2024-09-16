const { Schema, models, model } = require("mongoose");

const AddSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    address: {type: String, required: true},
    link: String,
    floor: Number,
    floors: Number,
    region: String,
    heatingType: String,
    propertyCondition: String,
    locativeFont: String,
    rooms: Number,
    baths: Number,
    balcony: Number,
    parking: String,
    type: String,
    price: Number,
    supraface: Number,
    images: [{type: String}]
}, {
    timestamps: true
})

export const Add = models.Add || model('Add', AddSchema);