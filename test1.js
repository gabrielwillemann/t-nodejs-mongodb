let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mytest', { useUnifiedTopology: true, useNewUrlParser: true });

let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => console.log('connected'));

let customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: {
    city: String,
    country: String,
  },
});

let customersCollection = mongoose.model('customers', customerSchema);

(async () => {
  let c = await customersCollection.findOneAndUpdate(
    { _id: '5e7a04ff0efe1f0125eba2cf' },
    {
      name: 'GABRIEL WILLEMANN',
      age: 30,
      address: {
        city: 'aurora',
        country: 'brazil',
      },
    },
    { new: true }
  );
  console.log(c);

  // let customer = new customersCollection({
  //   name: 'natanna',
  //   age: 25,
  //   address: {
  //     city: 'aurora',
  //     country: 'brazil',
  //   },
  // });
  // let c = await customer.save();
  // console.log(c);
})();

// customersCollection.find({}, (error, customers) => console.log(customers));
// customersCollection.find({'address.city': 'ituporanga'}, (error, customers) => console.log(customers));
// customersCollection.aggregate([{$limit: 2}], (error, customers) => console.log(customers));
