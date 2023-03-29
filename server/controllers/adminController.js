const userModel = require('../models/adminusermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//create user register user
exports.adminregister = async (req, res) => {
    try {
        const { name, email,contact,password,cpassword } = req.body;
        // validation
        // validation
if (!name || !email || !contact || !password || !cpassword) {
    return res.status(401).send({
      success:false,
      message:'Please fill all fields'
    }) 
  }
  
  if (contact.length<10) {
    return res.status(401).send({
      success:false,
      message:'minimum 10 Number is required for these contact'
    }) 
  }
  
//   if (!cpassword) {
//     return res.status(401).send({
//       success:false,
//       message:'Confirm Password is required'
//     }) 
//   }
  
  // confirm password check
  if (password !== cpassword) {
    return res.status(401).send({
      success:false,
      message:'Passwords and confirmPasswords did not match'
    })
  }

        // existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'User already exists',
            })
        }

        // before saving, convert the password into hash pattern
        const hashPassword = await bcrypt.hash(password, 10); // 10 is the salt value

        // save new user
        const user = new userModel({ name, email,contact, password: hashPassword,cpassword:hashPassword })
        await user.save()

         // generate token
         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        return res.status(200).send({
            success: true,
            message: 'successful',
            token,
            
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


//--------------------------------------------------------------------------------------

//create login
exports.adminloginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(401).send({
                sucess: false,
                message: 'Please provide email or password'
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                sucess: false,
                message: 'Email is not registerd'
            })
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                sucess: false,
                message: 'Password is not matched',
            })
        }

        // generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        return res.status(200).send({
            sucess: true,
            message: 'Login Sucessfully',
            token,
            
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            sucess: false,
            message: 'Error in Login Callback',
            err
        })
    }
}

//---------------------------------------------------------------------------------------------------------------------



//get all user
exports.getAlluser = async (req, res) => {
    try {
        const users = await userModel.find({})
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