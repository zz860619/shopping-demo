module.exports = (req,res,next) =>{
    if(!req.user.isAdmin){
        res.status(401).send({error:"You don't have permission!"});
    }

    next();
};