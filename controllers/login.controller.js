module.exports = {
  loginUser: (req, res) => {
    try {
      const { name } = req.user;
      
      res.json(`Welcome, ${ name }`);
    } catch (err) {
      next(err);
    }
  }
};
