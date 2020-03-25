let aqp = require('api-query-params');

let query = '';
query += 'name=gabriel&';
// query += 'address.city=ituporanga&';
query += 'filter={"address.city": "ituporanga"}&';
// query += 'limit=100&';
// query += 'skip=0&';
// query += 'sort=address.city&';
// query += 'fields=_id,name,age';

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mytest', { useUnifiedTopology: true, useNewUrlParser: true });

let customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: {
    city: String,
    country: String,
  },
});
let customersCollection = mongoose.model('customers', customerSchema);

// blacklist = null;
// blacklist = ['name'];
// blacklist = ['address.city'];

// whitelist = null;
// whitelist = ['name'];

let queryObject = aqp(query);
// let queryObject = aqp(query, { blacklist, whitelist });
console.log(queryObject);

let { filter, skip, limit, sort, projection, population } = queryObject;
customersCollection
  .find(filter)
  .skip(skip)
  .limit(limit)
  .sort(sort)
  .select(projection)
  .populate(population)
  .exec((error, customers) => {
    // console.log(error);
    // console.log(customers);
  });
