const cardestination = require('../models/cardestination');

exports.getbookdetail = async (req, res) => {

  try {
    const users = await cardestination.find({})
    return res.status(200).send({
        sucess: true,
        userCount: users.length,
        message: 'All ussers data',
        users
    });
} catch (err) {
    console.log(err);
    return res.status(500).send({
        sucess: false,
        message: 'Error in Get All Users',
        err
    })
}

}


exports.bookdetailcontrol = async (req, res) => {

  try {
    const { startdate, enddate, origin, destination } = req.body;
    // validation
    if (!startdate || !enddate || !origin || !destination) {
      return res.status(401).send({
        success: false,
        message: 'Please fill all fields'
      })
    }
    // save new user
    const user = new cardestination({
      startdate,
      enddate,
      origin,
      destination
    })
    await user.save()

    return res.status(200).send({
      success: true,
      message: 'successful',
      user,

    })
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Error in registered callback",
      success: false,
      err
    })
  }

}


//--------------------------------------------------------------------------------

exports.updatebooking = async (req, res) => {
  try {
    //we can use for take id use of req params
    const { id } = req.params;
    const { startdate, enddate, origin, destination } = req.body;

    // validate id parameter
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Invalid id parameter",
      });
    }

    // validate request body
    if (!startdate || !enddate || !origin || !destination) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }

    // find and update the booking details
    const updatedDetails = await cardestination.findByIdAndUpdate(
      id,
      { startdate, enddate, origin, destination },
      { new: true }
    );

    // check if booking details exists
    if (!updatedDetails) {
      return res.status(404).send({
        success: false,
        message: "Booking details not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Booking details updated successfully",
      details: updatedDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Error in updateBookingDetails callback",
      success: false,
      err,
    });
  }
};
