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
      if (err) throw err;
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
      res.json(item);
    });
  },

  // WIP
  // updateItem(req, res) {
  //   Inventory.findOneAndUpdate({ stock_number: res.body.stock_number }, (err, item) => {
  //     if (err) throw err;
  //     res.json(item);
  //   });
  // }

}
export default inventoryController;
