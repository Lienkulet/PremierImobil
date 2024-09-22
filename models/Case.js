const { Schema, models, model } = require("mongoose");

const CaseSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    address: {type: String, required: true},
    link: String,
    floors: Number,
    region: String,
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

export const Case = models.Case || model('Case', CaseSchema);