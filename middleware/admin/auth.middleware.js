const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model");

module.exports.requireAuth = async(req,res,next) => {
   if(!req.cookies.token){
    res.redirect(`/${systemConfig.PREFIX_ADMIN}/auth/login`);
    return;
   }
   const account = await Account.findOne({
    token:req.cookies.token,
    deleted:false
   });

   if(!account){
    res.redirect(`/${systemConfig.PREFIX_ADMIN}/auth/login`);
    return;
   }
   
   next();    
}