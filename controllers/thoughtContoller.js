const { Thought, User } = require("../models");

const thoughControllers ={

getAllThoughts(req,res){Thought.find().populate({path: 'reactions', select: '-__v'}).then(thoughtData=>res.json(thoughtData))
    .catch(err=>{ console.log(err); res.sendStatus(400)});
},

getThoughtById(req,res){Thought.findOne({_id:req.params.id}).then(thoughtData=> !thoughtData? res.status(404).json({message:' No matching thoughts found'}):res.json(thoughtData))},

createThought(req,res){Thought.create(req.body).then(thoughtData=>{
    return User.findOneAndUpdate({_id:req.body.userId}, {$push:{thoughts:thoughtData._id}},{new: true})
}).then(userData=> res.json(userData)).catch(err=> res.status(500).json(err))},

updateThought(req,res){Thought.findOneAndUpdate({_id:req.params.id},{$set:req.body},{runValidators:true, new:true}).then(thoughtData=> !thoughtData?
        res.status(404).json({message: 'no thought matches this id'}):res.json(thoughtData))},

deleteThought(req,res){Thought.findOneAndDelete({_id:req.params.id}).then(thoughtData => !thoughtData? res.status(404).json({message: 'no thought matches this id'}):res.json(thoughtData) )
    return User.findOneAndUpdate({_id: req.params.userId},{$pull: {thoughts: req.params.id}},{new:true}).then(userData => !userData? res.status(404).json({message: 'no user matches this id'}):res.json(userData))
    .catch(err=> res.json(err));
},

addReaction(req,res){Thought.findOneAndUpdate({_id: req.params.thoughtId},{$addToSet:{reactions:req.body}},{runValidators: true, new:true}).then(thoughtData=>
    !thoughtData? res.status(404).json({message:'no thought matches this id'}): res.json(thoughtData))},

deleteReaction(req,res){Thought.findOneAndUpdate({_id:req.params.thoughtId},{$pull: {reactions: {reactionId: req.params.reactionId}}},{runValidators:true, new:true})
    .then(thoughtData=> !thoughtData? res.status(404).json({message: "no thought matching this id"}):res.json(thoughtData))},
};

module.exports=thoughControllers;