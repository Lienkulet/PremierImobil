const { Schema, models, model } = require("mongoose");

const AddSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  characteristics: String,
  descriptionFooter: String,
  address: { type: String, required: true },
  link: String,
  linkName: String,
  floor: Number,
  floors: Number,
  region: String,
  sector: String,
  heatingType: String,
  propertyCondition: String,
  locativeFont: String,
  rooms: String,
  baths: Number,
  balcony: Number,
  parking: String,
  type: String,
  price: Number,
  supraface: Number,
  category: String,
  tipAnunt: String,
  images: [{ type: String }],
  agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recomandate: Boolean
}, {
  timestamps: true
});

export const Add = models.Add || model('Add', AddSchema);
