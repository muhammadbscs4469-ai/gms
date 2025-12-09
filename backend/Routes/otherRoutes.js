import express from "express";
import { addMenuCardItem, addRouteDetail, addPerformaInvoice } from "../Models/otherModels.js";

const router=express.Router();


router.post("/item", async(req, res)=>{
    const result = await addMenuCardItem(req.body);
    res.json(result);
});


router.post("/route", async(req,res)=>{ 
    const result=await addRouteDetail(req.body);
    res.json(result);
});

router.post("/performa", async(req,res)=>{
    const result=await addPerformaInvoice(req.body);
    res.json(result);

});

export default router;









