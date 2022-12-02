const { Thought, User } = require("../models");

const userControllers= {

getAllUsers(req,res){
    User.find().select('__v').then(Users=> res.json(Users)).catch(err=>{console.log(err); res.sendStatus(400)})},

getUserById(req,res){
    User.findOne({_id: req.params.id}).then(userData=> !userData ?res.status(404).json({message: "no user matches this ID "}): res.json(userData))},

createNewUser(req,res){
    User.create(req.body).then(userData=> res.json(userData)).catch(err => res.status(500).json(err))},

updateUser(req,res){User.findOneAndUpdate({_id:req.params.id},
    {$set:req.body},
    {runValidators:true,new:true})
    .then(userData=> !userData? res.status(404).json({message: "No user found with this id"}):res.json(userData))
},

deleteUser(req,res){User.findOneAndDelete({_id:req.params.id}).then(userData => 
    !userData? res.status(404).json({message:"no matching user"}): res.json({message:'User has been deleted'}))},

addFriend(req,res){User.findOneAndUpdate({_id: req.params.id},{$addToSet:{friends:req.params.friendsId}},{runValidators:true, new:true})
    .then(userData => !userData ? res.status(404).json({message:'no user matching this id'}): res.json(userData));
},

deleteFriend(req,res){User.findOneAndDelete({_id:req.params.id},{$pull:{friends:req.params.friendsId}},{runValidators: true, new: true})
    .then(userData => !userData? res.status(404).json({message: 'no user matching this id'}): res.json(userData))
}
};

module.exports = userControllers;

