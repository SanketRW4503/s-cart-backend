import { instance } from '../server.js';







async function checkoutfun(req, res) {
    console.log('request hit');
    const options = {
        amount: Number(req.body.amount*100),
        currency: 'INR',
    }

    try {
        const order = await instance.orders.create(options);

        res.json({success:true,order})
    } catch (error) {
            res.status(400).json({success:false})
    }   


}




export default checkoutfun;
