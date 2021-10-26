const messageModel = require('./../models/message');

const authGuard=(req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        message = new messageModel("error", "Session Expired please login again");
      req.flash("message", message);
      res.redirect("/auth/signin");
    }
}
module.exports=authGuard;