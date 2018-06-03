const RSVP = require('../models/RSVP');

exports.create = async (req, res) => {

  if (req.body.email) {
    const rsvp = await RSVP.findOne({email: req.body.email});
    if (rsvp) {
      return res.status(409).send({
        success: false,
        message: 'RSVP exists',
        data: rsvp
      });
    }
  }

  RSVP.create(req.body)
    .then(rsvp => {
      return res.status(201).send({
        success: true,
        message: 'New rsvp successfully created',
        data: rsvp
      });
    })
    .catch(err => {
      return res.status(400).send({
        success: false,
        message: 'There was a problem adding the information to the database.',
        errors: err
      });
    });
}

exports.update = async (req, res) => {

  RSVP.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(rsvp => {
      // console.log('RSVP: ', rsvp);
      return res.status(201).send({
        success: true,
        message: 'RSVP updated successfully',
        data: rsvp
      });
    })
    .catch(err => {
      // console.log('RSVP ERR: ', err);
      return res.status(400).send({
        success: false,
        message: 'There was a problem adding the information to the database.',
        errors: err
      });
    });

}
