const { db } = require("../util/admin");

// get all items from collection. define empty array. for each item, push to empty array the id and the data contents. return the array.
exports.getAllItems = (req, res) => {
  db.collection("items")
    .get()
    .then(data => {
      let items = [];
      data.forEach(doc => {
        items.push({
          itemId: doc.id,
          ...doc.data()
        });
      });
      return res.json(items);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// define empty object. get item from collection with params of itemId. if item exists, push data and item id to object. return the item from docs.
exports.getItem = (req, res) => {
  let itemData = {};
  db.doc(`/items/${req.params.itemId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item does not exist." });
      }
      itemData = doc.data();
      itemData.itemId = doc.id;
      return db
        .collection("items")
        .where("itemId", "==", req.params.itemId)
        .get();
    })
    .then(() => {
      res.json(itemData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.createItem = (req, res) => {
  const newItem = {
    title: req.body.title,
    style: req.body.style,
    color: req.body.color,
    neckline: req.body.neckline,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    quantity: req.body.quantity,
    addedToCart: req.body.addedToCart,
    createdAt: new Date().toISOString()
  };

  db.collection("items")
    .add(newItem)
    .then(doc => {
      resItem = newItem;
      resItem.itemId = doc.id;
      res.json(resItem);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
