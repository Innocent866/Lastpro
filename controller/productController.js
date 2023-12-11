const productModel = require('../model/productModel');

// inserting many product
const insertMany = async(req,res)=>{
    try{
        const products = await productModel.insertMany(req.body)
        res.status(201).json({success:true,message:"successfully cereated all product",products})
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:error})
    }
}

const createproduct = async(req,res)=>{
    try{
        const product = await productModel.create(req.body)
        res.status(201).json({success:true,message:"successfully created a product",product})
    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message:error})
    }
}

// delete
const deleteMany = async(req,res)=>{
    try{
        const product = await productModel.deleteMany({})
        res.status(200).json({success:true,message:'successfully deleted',product})
    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message:error})
    }
}

const singleproduct = async (req,res)=>{
    try{
        const product = await productModel.findById(req.params.productId);
        res.status(200).json({success:true,message:"single product", product})
    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message:error})
    }
}

const allproduct = async(req,res)=>{
    try {
        const product = await productModel.find()
        if (product.length<1 ) {
            res.status(400).json({success:false,message:"no product's found Create one"})
            return
        }
        res.status(200).json({status:true,message:"all product", product})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:error})
    }
}

module.exports = {
    insertMany,
    createproduct,
    deleteMany,
    singleproduct,
    allproduct
}