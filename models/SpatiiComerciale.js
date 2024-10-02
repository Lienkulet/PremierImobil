const { Schema, models, model } = require("mongoose");

const SpatiiComercialeSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    address: {type: String, required: true},
    link: String,
    linkName: String,
    region: String,
    sector: String,
    destination: String,
    propertyCondition: String,
    rooms: Number,
    type: String,
    price: Number,
    supraface: Number,
    category: String,
    tipAnunt: String,
    images: [{type: String}],
    agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recomandate: Boolean
}, {
    timestamps: true
})

export const SpatiiComerciale = models.SpatiiComerciale || model('SpatiiComerciale', SpatiiComercialeSchema);