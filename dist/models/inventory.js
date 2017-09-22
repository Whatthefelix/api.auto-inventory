'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InventorySchema = new _mongoose2.default.Schema({
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

exports.default = _mongoose2.default.model('Inventory', InventorySchema);
// InventorySchema.set('toJSON', getters: true)
//# sourceMappingURL=inventory.js.map