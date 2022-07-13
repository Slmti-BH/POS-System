const { Router } = require("express");
const inventoryRoutes = Router();
const db = require("../database");
const { v4: uuid } = require("uuid");

// get request
inventoryRoutes.get("/list", (req, res) => {
  const sql = "SELECT * FROM Inventory_list";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

const getRecord = (ID) => {
  return new Promise((resolve, reject) => {
    const sqlToCheck = "SELECT * FROM Inventory_list WHERE ID=?";
    const toCheckInserts = [ID];
    db.query(sqlToCheck, toCheckInserts, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};

// to edit inventory
inventoryRoutes.put("/:invID", (req, res) => {
  getRecord(`${req.params.invID}`)
    .then((response) => {
      if (response.length === 0) {
        return res.status(404).send("Please enter valid inventory id.");
      } else {
        const sql =
          "UPDATE Inventory_list SET item=?, qty=?, price=?, tax=? WHERE ID=?";
        const inserts = [
          `${req.body.item}`,
          `${req.body.qty}`,
          `${req.body.price}`,
          `${req.body.tax}`,
          `${req.params.invID}`,
        ];
        db.query(sql, inserts, (err, result) => {
          if (err) throw err;
          res.status(200).send({ msg: "Inventory updated" });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// post
inventoryRoutes.post("/add", (req, res) => {
  const id = uuid();
  const obj = {
    ID: id,
    item: req.body.item,
    qty: req.body.qty,
    price: req.body.price,
    tax: req.body.tax,
  };
  const sql = "INSERT INTO INVENTORY_LIST SET ?";
  db.query(sql, obj, (err, result) => {
    if (err) throw err;
    res.status(201).send(obj);
  });
});

// get inventory by ID
inventoryRoutes.get("/:id", (req, res) => {
  getRecord(`${req.params.id}`)
    .then((response) => {
      if (response.length === 0) {
        res.status(404).send({ msg: "Please use correct inventory id" });
      } else {
        res.status(200).send(response);
        // const sql = "SELECT * FROM Inventory_list WHERE ID=?";
        // const insert = [`${req.params.id}`];
        // db.query(sql, insert, (err, result) => {
        //   if (err) throw err;
        //   res.status(200).send(result);
        // });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete inventory by id
inventoryRoutes.delete("/:id", (req, res) => {
  getRecord(`${req.params.id}`)
    .then((response) => {
      if (response.length === 0) {
        res.status(404).send({ msg: "Please use correct inventory id" });
      } else {
        const sql = "DELETE FROM Inventory_list WHERE ID=?";
        const insert = [`${req.params.id}`];
        db.query(sql, insert, (err, result) => {
          if (err) throw err;
          res.status(200).send(response);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = inventoryRoutes;
