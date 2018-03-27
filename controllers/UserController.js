const User = require('../models/User');


exports.list = async (req, res) => {
  const users = await User.find();
  return res.status(200).send({
    success: true, 
    message: 'User @list route',
    data: users
  });
};

exports.create = (req, res) => {
  return res.status(200).send({
    success: true, 
    message: 'User @create route.', 
    data: req.body
  });
};

// example with token middleware
exports.show = async (req, res) => {
  if (req.decoded.id == req.params.id){
    // return res.status(200).send({success: true, message: 'User @retrieve route for id: ' + req.params.id, data: req.decoded});

    const user = await User.findById(req.decoded.id);
     
    if (!user) {
      return res.status(404).send("No user found.");
    }
    return res.status(200).send({ 
      success: true, 
      message: 'User @retrieve route for id: ' + req.params.id, 
      data: user
    });
      // })
      // .catch((err) => {
      //   return res.status(500).send("There was a problem finding the user.");
      // });
  } else {
    return res.status(403).send({ 
      success: false, 
      message: 'User @retrieve route for id - not authorised to view user ' + req.params.id, 
      data: req.decoded
    });
  }
};

exports.update = (req, res) => {
  return res.status(200).send({
    success: true, 
    message: 'User @update route for id: ' + req.params.id, 
    data: req.body
  });
};

exports.destroy = (req, res) => {
  return res.status(200).send({
    success: true, 
    message: 'User @destroy route for id: ' + req.params.id, 
    data: req.body
  });
};
