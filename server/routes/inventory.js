const {Router}=require("express");
const inventoryRoutes=Router();
const db=require("../database");
const {v4:uuid}=require("uuid");

// get request
inventoryRoutes.get("/list",async(req,res)=>{
    const resData=await db.promise().query(`SELECT * FROM Inventory_list`);
    console.log(resData[0]);
    res.status(200).send(resData[0]);
});

// post
inventoryRoutes.post("/add",(req,res)=>{
    const {item,qty,price,tax}=req.body;
    const id=uuid();
    if(item){
        try{
        db.promise().query(`INSERT INTO INVENTORY_LIST VALUES("${id}","${item}","${qty}", "${price}", "${tax}" )`);
        res.status(201).send({msg:"Inventory created"});
        }
        catch(err){
            console.log(err)
        }
        
    }
})

module.exports=inventoryRoutes;