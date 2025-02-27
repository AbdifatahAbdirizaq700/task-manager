module.exports = (req,) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }   next();
  };
  

  


 
    