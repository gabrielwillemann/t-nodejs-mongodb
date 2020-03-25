let { app } = require('./express.js');
let { mongoose } = require('./mongoose.js');
let { routeResource } = require('./routes.js');

let customerDefinition = {
  name: String,
  age: Number,
  date: String,
  address: {
    city: String,
    country: String,
  },
};
let invisibleFields = { __v: 0 };
let customersSchema = new mongoose.Schema(customerDefinition);
let customersCollection = mongoose.model('customers', customersSchema);

// EXAMPLE: CUSTOM ROUTE
// app.get(`/${customersCollection.modelName}/test/x`, async (req, res) => {
//   res.send('Hello word');
// });

routeResource({ collection: customersCollection, invisibleFields });

module.exports = {
  customersSchema,
  customersCollection,
};
