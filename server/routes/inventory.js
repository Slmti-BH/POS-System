const { Router } = require("express");
const inventoryRoutes = Router();
const db = require("../database");
const { v4: uuid } = require("uuid");

// get request
const getData = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Inventory_list";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

inventoryRoutes.get("/list", (req, res) => {
  getData()
    .then((response) => {
      const dirOptions = ["ASC", "DESC"];
      const sortOptions = ["item", "qty", "price", "tax"];

      if (req.query.dir && !dirOptions.includes(req.query.dir)) {
        res.status(404).send("Dir parameter invalid.");
      } else if (req.query.sortby && !sortOptions.includes(req.query.sortby)) {
        res.status(404).send("Sortby parameter invalid.");
      }

      const quickSort = (arr) => {
        if (arr.length <= 1) {
          return arr;
        }

        const pivot = arr[arr.length - 1];
        const leftArr = [];
        const rightArr = [];

        // sortby item
        if (!req.query.sortby || sortOptions.indexOf(req.query.sortby) === 0) {
          for (let i = 0; i < arr.length - 1; i++) {
            arr[i].item < pivot.item
              ? leftArr.push(arr[i])
              : rightArr.push(arr[i]);
          }
        }
        // sortby qty
        if (sortOptions.indexOf(req.query.sortby) === 1) {
          for (let i = 0; i < arr.length - 1; i++) {
            arr[i].qty < pivot.qty
              ? leftArr.push(arr[i])
              : rightArr.push(arr[i]);
          }
        }
        // sortby price
        if (sortOptions.indexOf(req.query.sortby) === 2) {
          for (let i = 0; i < arr.length - 1; i++) {
            arr[i].price < pivot.price
              ? leftArr.push(arr[i])
              : rightArr.push(arr[i]);
          }
        }
        // sortby tax
        if (sortOptions.indexOf(req.query.sortby) === 3) {
          for (let i = 0; i < arr.length - 1; i++) {
            arr[i].tax < pivot.tax
              ? leftArr.push(arr[i])
              : rightArr.push(arr[i]);
          }
        }

        return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
      };

      // sort dir
      !req.query.dir || dirOptions.indexOf(req.query.dir) === 0
        ? res.status(200).send(quickSort(response))
        : res.status(200).send(quickSort(response).reverse());
    })
    .catch((err) => {
      console.log(err);
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
