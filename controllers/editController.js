

exports.editPage=(req,res,next)=>{
    const message = req.flash("message")[0];
    res.render('./../views/pages/editPage',{
        message: message ? message : {},
    })
}

