const { Schema, models, model } = require("mongoose");

const CaseSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    address: {type: String, required: true},
    link: String,
    linkName: String,
    floors: Number,
    region: String,
    sector: String,
    propertyCondition: String,
    locativeFont: String,
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

export const Case = models.Case || model('Case', CaseSchema);