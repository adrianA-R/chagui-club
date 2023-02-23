module.exports = {
  isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    return res.redirect('/signin');
  },
  isLoggedInIndex (req, res){
    if(req.isAuthenticated()){
      return res.redirect('/games');
    }
  }
} 