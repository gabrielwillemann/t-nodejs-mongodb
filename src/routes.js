let aqp = require('api-query-params');

let { app } = require('./express.js');

function routeIndex({ collection, invisibleFields }) {
  app.get(`/${collection.modelName}`, async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      let { filter, skip, limit, sort, population } = aqp(req.query);

      let record = await collection
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(invisibleFields)
        .populate(population);

      res.send(record);
    } catch (error) {
      res.send(error);
    }
  });
}

function routeShow({ collection, invisibleFields }) {
  app.get(`/${collection.modelName}/:id`, async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      let record = await collection.findOne({ _id: req.params.id }).select(invisibleFields);
      res.send(record);
    } catch (error) {
      res.send(error);
    }
  });
}

function routeCreate({ collection }) {
  app.post(`/${collection.modelName}`, async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      let record = await new collection(req.body).save();
      res.send(record);
    } catch (error) {
      res.send(error);
    }
  });
}

function routeUpdate({ collection }) {
  app.patch(`/${collection.modelName}/:id`, async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      let record = await collection.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      res.send(record);
    } catch (error) {
      res.send(error);
    }
  });
}

function routeDelete({ collection }) {
  app.delete(`/${collection.modelName}/:id`, async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      let customer = await collection.deleteOne({ _id: req.params.id });
      res.send(customer);
    } catch (error) {
      res.send(error);
    }
  });
}

function routeResource({ collection, invisibleFields, allowDelete = false }) {
  routeIndex({ collection, invisibleFields });
  routeShow({ collection, invisibleFields });
  routeCreate({ collection });
  routeUpdate({ collection });
  if (allowDelete) routeDelete({ collection });
}

module.exports = { routeResource };
