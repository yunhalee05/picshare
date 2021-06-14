import express from 'express';
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler'
import { generateToken, isAdmin } from '../utils.js';
import { isAuth } from '../utils.js';


const userRouter = express.Router();

userRouter.get('/top-sellers', expressAsyncHandler(async(req, res)=>{
  const topSellers = await User.find({isSeller:true}).sort({'seller.rating':-1}).limit(3)
  res.send(topSellers)
}))



userRouter.post('/signin', expressAsyncHandler(async (req, res)=>{
  const user = await User.findOne({email:req.body.email});
  if(user){
    if(bcrypt.compareSync(req.body.password, user.password)){
      res.send({
        _id:user.id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        isSeller:user.isSeller,
        token:generateToken(user)
      });
      return ;
    }
  }
  res.status(401).send({message:"Invalid email or password"})
}))
  
userRouter.post('/register', expressAsyncHandler(async(req, res)=>{
  const user = new User({
                name: req.body.name, 
                email:req.body.email, 
                password: bcrypt.hashSync(req.body.password, 8),
                isSeller:req.body.isSeller,
                seller:{
                  name:req.body.name
                }
                })

  const createdUser = await user.save();
  res.send({
    _id:createdUser.id,
    name:createdUser.name,
    email:createdUser.email,
    isAdmin:user.isAdmin,
    isSeller:createdUser.isSeller,
    token:generateToken(createdUser)
  });
}))

userRouter.get('/:id', expressAsyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id);
  if(user){
    res.send(user);
  }else{
    res.status(404).send({message:'User Not Found'});
  }
}))

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id);
  if(user){
    user.name = req.body.name || user.nmae;
    user.email = req.body.email||user.email;
    if(user.isSeller){
      user.seller.name = req.body.sellerName|| user.seller.name;
      user.seller.logo = req.body.sellerLogo|| user.seller.logo;
      user.seller.description = req.body.sellerDescription || user.seller.description;
    }
    if(req.body.password){
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updateUser = await user.save();
    res.send({
      _id:updateUser._id ,
      email: updateUser.email,
      name: updateUser.name,
      isAdmin: updateUser.isAdmin,
      isSeller:updateUser.isSeller,
      token: generateToken(updateUser),
    })
  }
}))

userRouter.get('/', isAuth,isAdmin, expressAsyncHandler(async(req, res)=>{  
  const users = await User.find({})
  res.send(users);

}))


userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
  const user = await User.findById(req.params.id)
  if(user){
    if(user.isAdmin === true){
      res.status(400).send({message:'Can Not Delete Admin User'})
      return;
    }
    const deletedUser = await user.remove();
    res.send({message: 'User Deleted', user:deletedUser})
  }else{
    res.status(404).send({message:'User Not Found'})
  }
}))

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller =req.body.isSeller === user.isSeller ? user.isSeller : req.body.isSeller; //Boolean(req.body.isSeller)     
      user.isAdmin =req.body.isAdmin === user.isAdmin ? user.isAdmin : req.body.isAdmin;//Boolean(req.body.isAdmin)
      
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;