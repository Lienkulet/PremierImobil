const { Schema, models, model } = require("mongoose");

const SpatiiComercialeSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    address: {type: String, required: true},
    link: String,
    region: String,
    sector: String,
    destination: String,
    propertyCondition: String,
    rooms: Number,
    type: String,
    price: Number,
    supraface: Number,
    images: [{type: String}]
}, {
    timestamps: true
})

export const SpatiiComerciale = models.SpatiiComerciale || model('SpatiiComerciale', SpatiiComercialeSchema);