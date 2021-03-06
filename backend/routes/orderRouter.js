import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth, isSellerOrAdmin,transport, payOrderEmailTemplate } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res)=>{
  const page = req.query.page || 1
  const limit = Number(req.query.limit) || 9

    const count = await Order.find({user: req.user._id}).count();
    const orders = await Order.find({user: req.user._id})
                              .sort('-createdAt')
                              .skip(limit * (page-1))
                              .limit(limit);
    res.send({orders, pages:Math.ceil(count / limit), count}); 
}))


orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length===0){
        res.status(400).send({message:'Cart is empty'})
    }else{
        const order = new Order({
            seller:req.body.orderItems[0].seller,//첫번째 상품의 셀러정보를 등록
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user:req.user._id
        })
        const createdOrder = await order.save();
        res.status(201).send({message:'New Order reated', order:createdOrder})
    }
}))

orderRouter.get(
    '/summary',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ]);
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
      const dailyOrders = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orders: { $sum: 1 },
            sales: { $sum: '$totalPrice' },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const productCategories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]);
      res.send({ users, orders, dailyOrders, productCategories });
    })
  );

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id);

    if(order){
        res.send(order);
    }else{
        res.status(404).send({message:'Order Not Found'})
    }
}))

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res)=>{
    const order = await Order.findById(req.params.id).populate('user','email');
    if(order){
        order.isPaid = true,
        order.paidAt = Date.now();
        order.paymentResult = {id: req.body.id, status:req.body.status, update_time:req.body.update_time, email:req.body.email_address}
        const updatedOrder = await order.save();

        for (const index in updatedOrder.orderItems) {
          const item = updatedOrder.orderItems[index];
          const product = await Product.findById(item.product);
          product.countInStock -= item.qty;
          product.sold += item.qty;      
          await product.save();
        }

        await transport.sendMail({
          from :'"Picshare" <picshare@mg.picshare-with-you.com>',
          to:`${order.user.name},${order.user.email}`,
          subject:`New order ${order._id}`,
          html: payOrderEmailTemplate(order)
        }, (error, body)=>{
          if(error){
              res.status(404).send({message:error.message});
          }
        })
        
        res.send({message:'Order Paid', order: updatedOrder})
    }else{
        res.status(404).send({message:'Order Not Found'})
    }
}))

orderRouter.get('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async(req, res)=>{
    const seller = req.query.seller || ''
    const page = req.query.page || 1
    const limit = Number(req.query.limit) || 9

    const sellerFilter = seller? {seller} :{};

    const count = await Order.count({...sellerFilter})
    const orders = await Order.find({...sellerFilter})
                              .populate('user', 'name')
                              .sort('-createdAt')
                              .skip(limit * (page-1))
                              .limit(limit);
    res.send({
      orders:orders,
      count,
      pages:Math.ceil(count / limit)
    });
}))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        const deleteOrder = await order.remove();
        res.send({message:'Order Deleted', order:deleteOrder})
    }else{
        res.status(404).send({message:'Order Not Found'})
    }
}))



orderRouter.put('/:id/deliver', isAuth,isSellerOrAdmin, expressAsyncHandler(async (req, res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true,
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send({message:'Order Delivered', order: updatedOrder})
    }else{
        res.status(404).send({message:'Order Not Found'})
    }
}))


export default orderRouter;