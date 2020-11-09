module.exports.home=async function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
   
    
    return res.render('signUpsignIn.ejs')
}

