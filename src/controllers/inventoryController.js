import app from '../index';
import Inventory from '../models/inventory';

const inventoryController = {

  showAll(req, res) {
    Inventory.find({}, (err, inventory) => {
      if(err) throw err;
      res.json(inventory);
    });
  },

  create(req, res) {
    req.body.purchase_date = Date.now();
    let inventory = new Inventory(req.body);

    inventory.save((err) => {
      if (err && err.code === 11000) {
        res.json({
          success: false,
          status: 400,
          message: 'Duplicate Stock Number'
        });
        return;
      };
      res.json({
        success: true,
        status: 201,
        message: 'Item has been added'
      });
    });
  },

  getById(req, res) {
    Inventory.findOne({ stock_number: req.params.stock_number }, (err, item) => {
      if (err) throw err;

      if (!item) {
        res.json({
          success: false,
          status: 404,
          message: 'No item found'
        });
        return;
      } else {
        res.json(item);
      }
    });
  },

  updateItem(req, res) {
    let updatedItem = req.body;
    Inventory.findOneAndUpdate({ stock_number: req.params.stock_number }, updatedItem, (err, item) => {
      if (err) {
        res.json({
          success: false,
          status: 404,
          message: 'stock number not found'
        });
        return;
      };
      if (!item) {
        res.json({
          success: false,
          status: 404,
          message: 'No item found'
        });
        return
      }
      res.json({
        success: true,
        status: 200,
        message: `${req.params.stock_number} has been updated`
      });
    });
  },

  deleteOne(req, res) {
    let item = req.body
    Inventory.deleteOne(item, (err, item) => {
      if (err) throw err;
      if (!item) {
        res.json({
          success: false,
          status: 404,
          message: 'No item found'
        });
      } else {
        res.json({
          success: true,
          status: 201,
          message: `${req.body.stock_number} has been deleted`
        });
      }
    });
  }

}
export default inventoryController;
