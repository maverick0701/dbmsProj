const Like=require('../models/like');
const User=require('../models/mongoose');


module.exports.toggleLike = async function(req, res){
    try{

        //git s lssssgit sikes/toggle/?id=abcdef&type=Post_by lovBabbargit 
        let likeable;
        let deleted = false;
        likeable = await User.findById(req.query.id).populate('likes');
        console.log(req.query);

        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            user: req.user._id
        })

        // if a like already exists then delete it
        if (existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;

        }else{
            // else make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id
            });

            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.json(200, {
            message: "Request successful!",
            data: {
                deleted: deleted
            }
        })



    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}