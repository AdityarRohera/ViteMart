import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";

import { getAllProducts, getProduct, newProduct, updateProduct } from "../../Services/vendors/product.service.js";

export const newProductHandler = async (req: Request, res: Response) => {
  try {
        const vendor_id = (req as AuthenticatedRequest).user.userId;

        const {
          label,
          description,
          buying_price,
          selling_price,
          category_id,
          product_url,
          productId,
        } = req.body;

        console.log("Getting product id -> " , productId , " " , label , buying_price , selling_price , product_url);

        if (!label || !buying_price || !selling_price || !product_url) {
          return res.status(400).json({
            success: false,
            message: "Invalid data",
          });
        }

        let result;

        // UPDATE product
        if (productId) {
            console.log(productId)
          result = await updateProduct({
            label,
            description,
            buying_price,
            selling_price,
            category_id,
            product_url,
            productId
          });

          console.log(result.rows)

          if (result.rowCount === 0) {
            return res.status(404).json({
              success: false,
              message: "Product not found or unauthorized",
            });
          }

          return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: result.rows[0],
          });
    }

        // CREATE product
        result = await newProduct({
          label,
          description,
          buying_price,
          selling_price,
          category_id,
          product_url,
          vendor_id,
        });

        return res.status(200).json({
          success: true,
          message: "Product created successfully",
          product: result.rows[0],
        });

  } catch (err: unknown) {
    console.log("Product handler error:", err);

    return res.status(500).json({
      success: false,
      message: "Product operation failed",
      error : err
    });
  }
};


export const fetchProductHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside fetching product handler")
        
        const {productId} = req.params;

        if(!productId){
            return res.status(400).json({
                success : false,
                message : "ProductId Required"
            })
        }

        // Get products
        const product = await getProduct(productId);
        
        return res.status(200).send({
            success : true,
            message : 'Get product successfully',
            product : product.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting product-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting product",
            error : errmessage
        })
    }
}

export const fetchAllProductsHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside fetching All products handler")
        const vendor_id = (req as AuthenticatedRequest).user.userId;

        const products = await getAllProducts(vendor_id);
        
        return res.status(200).send({
            success : true,
            message : 'Get product successfully',
            products : products.rows
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting all products-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting all products",
            error : errmessage
        })
    }
}
