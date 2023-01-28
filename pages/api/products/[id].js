import dbConnect from '../../../utilities/mongo';

import Product from '../../../models/Product';





export default async function handler(req, res){
    const {method, query:{id}} = req;

    dbConnect()


     if( method === "GET"){
         try{
             const product = await Product.findById(id);
             //Specify what to find 
             res.status(200).json(product)
         }catch(err) {
             res.status(500).json(err);
         }
     }


    if( method === "POST"){
        try{
            const product = await Product.create(req.body);
            res.status(201).json(product)
        }catch(err){res.status(500).json(err);}
    }

    if( method === "PUT"){
        try{
            const product = await Product.create(req.body);
            res.status(201).json(product)
        }catch(err){res.status(500).json(err);}
    }

    if( method === "DELETE"){
        try{
             await Product.findByIdAndDelete(id);
            res.status(201).json("Product has been deleted")
        }catch(err){res.status(500).json(err);}
    }
}
