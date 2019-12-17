const mongoose = require('mongoose');
const Items = mongoose.model("items")
const isAdmin = require("../middlewares/isAdmin")



module.exports = (app) => {

    //Get All Items
    app.get("/api/items",(req,res)=>{
        Items.find({},(err,Founditems)=>{
            if(err) res.send({error:err});

            res.send({Founditems,error:null});
        });
    })


    //Get One Item
    app.get("/api/items/:id",async (req,res)=>{
        const item = await Items.findById(req.params.id,(err)=>{
            if(err) res.send({error:err});        
        });
        res.send({item,error:null});
    })



    //Create Items
    app.post("/api/items/new",isAdmin,async (req,res)=>{
        const item = await new Items(req.body);
        item.save(function (err,item) {
            if(err) res.send({error:err});
            res.send({item,error:null});
        });

        
    })

    //Edit Item

    app.patch("/api/items/edit/:id",isAdmin,async (req,res)=>{
        const UpdatedItem = await Items.findByIdAndUpdate(req.params.id,req.body,{new:true},(err)=>{
            if(err) res.send({error:err});
        });
        res.send({UpdatedItem,error:null});
    });


    //Delete Item
    app.delete("/api/items/delete/:id",isAdmin,(req,res)=>{
        Items.findByIdAndDelete(req.params.id,(err)=>{
            if(err) res.send({error:err});
            res.send({error:null});
        });
        
    });

}


