const { Schema, models, model } = require("mongoose");

const TerenuriSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    address: {type: String, required: true},
    link: String,
    region: String,
    sector: String,
    destination: String,
    type: String,
    price: Number,
    supraface: Number,
    images: [{type: String}]
}, {
    timestamps: true
})

export const Terenuri = models.Terenuri || model('Terenuri', TerenuriSchema);