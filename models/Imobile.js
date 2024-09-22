const { Schema, models, model } = require("mongoose");

const AddSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    address: {type: String, required: true},
    link: String,
    region: String,
    heatingType: String,
    propertyCondition: String,
    locativeFont: String,
    rooms: Number,
    type: String,
    price: Number,
    supraface: Number,
    images: [{type: String}]
}, {
    timestamps: true
})

export const Add = models.Add || model('Add', AddSchema);