
import cartModel from '../models/cartModel.js';

// add item to cart 
async function add_to_cart(req, res) {

    try {
        let cart = await cartModel.findOne({ userid: req.body.userid })

        if (cart) {
            console.log('already exists')

            // update :
            let itemIndex = cart.products.findIndex((p) => p._id == req.body?.products[0]._id);

            if (itemIndex > -1) {
                // update the quantity of product becouse it already exits
                cart.products[itemIndex].quantity = cart.products[itemIndex].quantity + 1
                cart = await cart.save();
                res.json({ success: true, message: "Product Already Exists in Cart ! quantity updated", cart })

            } else {
                cart.products.push(req.body?.products[0]);
                cart = await cart.save();
                res.json({ success: true, message: "Prduct Added To cart", cart })
            }

        } else {
            let cart = await cartModel.create(req.body)
            if (cart) {
                res.json({ success: true, message: "Item Added Successfully", cart })
            }
        }
    } catch (error) {
        res.json({ success: false, error })
    }

}

// delete one item from cart

async function delete_one_item_cart(req,res){
   
    let cart = await cartModel.findOne({ userid: req.body.userid })

    if(cart){
        let itemIndex = cart.products.findIndex((p) => p._id == req.body?._id);
        if(itemIndex>-1){
            cart.products.splice(itemIndex,1);
            cart = await cart.save();
            res.json({ success: true, message: "Item Deleted Successfully", cart });
        }else{
            res.json({success:false,message:"cart empty"});
        }

    }else{
        res.json({success:false,message:"INVALID USER ID or Cart empty"});

    }


}


// remove one item from cart 
async function remove_one_item_cart(req,res){
   
    let cart = await cartModel.findOne({ userid: req.body.userid })

    if(cart){
        let itemIndex = cart.products.findIndex((p) => p._id == req.body?._id);
        if(itemIndex>-1){

            if(cart.products[itemIndex].quantity==1){
                delete_one_item_cart(req,res);
            }else{
            console.log(cart.products.quantity)
            cart.products[itemIndex].quantity=cart.products[itemIndex].quantity-1;
            cart = await cart.save();
            res.json({ success: true, message: "one item removed ! quantity updated", cart });
            }
        }else{
            res.json({success:false,message:"cart empty"});
        }

    }else{
        res.json({success:false,message:"INVALID USER ID or Cart empty"});

    }


}


// empty cart
async function empty_cart(req,res){
   
    let cart = await cartModel.findOne({ userid: req.body.userid });

    if(cart){
      
            cart.products.splice(0,cart.products.length);
            cart = await cart.save();
            res.json({ success: true, message: "cart empty", cart });
        
    }else{

        res.json({success:false,message:"INVALID USER ID or Cart empty"});

    }


}



// get all cart items

async function get_cart_items(req,res){
 
    try {
        const result= await cartModel.findOne({userid:req.body.userid});
        if(result!==null){

            res.json({success:true,items:result.products});
        }else{
            res.json({success:false,message:'No Record Found !'})
        }
    } catch (error) {
            res.json({success:false,message:'some error occured !'})
    }

}




export { add_to_cart, delete_one_item_cart, empty_cart, remove_one_item_cart, get_cart_items };
