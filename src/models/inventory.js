import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  purchase_date: Date,
  seller: String,
  stock_number: {
      type: String,
      required: true,
      unique: true
  },
  last_six: String,
  cost: Number,
  gst: Number,
  total: Number,
  flooring_cost: Number,
  td_draft_number: String,
  draft_status: Boolean,
  due_to_1005195: Number,
  booked_date: Date
});

export default mongoose.model('Inventory', InventorySchema);
// InventorySchema.set('toJSON', getters: true)