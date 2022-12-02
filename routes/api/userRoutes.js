const router = require("express").Router();
const{getAllUsers,getUserById,createNewUser,updateUser,deleteUser,addFriend,deleteFriend}=require("../../controllers/userController");

//get all and post /api/users
router.route("/").get(getAllUsers).post(createNewUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendsId").post(addFriend).delete(deleteFriend);

module.exports = router;