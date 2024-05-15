const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { createAccessToken } =  require("../utils/Token");
const { validateEmail } = require("../utils/Validation")

exports.signup = async (req, res) => {
    try {
        const { userName, emailAddress, password } = req.body;
            if (!userName || !emailAddress || !password){
                return res.status(400).json({msg: "Please fill all the fields!"});
            }
            if (typeof userName !== "string" || typeof emailAddress !== "string" || typeof password !== "string" ){
                return res.status(400).json({msg: "String values only allowed!"})
            }
            if (password.length < 6) {
                return res.status(400).json({msg: "Password must be atleast 6 characters!"})
            }
            if (!validateEmail(emailAddress)){
                return res.status(400).json({msg: "Invalid Email Address!"})
            }

            const user = await User.findOne({emailAddress});
            const hashedPassword = await bcrypt.hash(password,10);

            if(user){
                return res.status(400).json({msg: "An account with this email address already exists."})
            }

            await User.create({ userName, emailAddress, password: hashedPassword});
            res.status(200).json({msg:"Congratulations! Your account has been successfully created."})
    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: "Internal Server Error!"});
    }
}

exports.login = async(req, res) => {
    try {
        const { emailAddress, password } = req.body;
        if(!emailAddress || !password){
            return res.status(400).json({status: false, msg: "Please enter your details!"})  
        }

        const user = await User.findOne({emailAddress});
        if(!user) return res.status(400).json({status: false, msg: "This email is not yet registered!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({status: false, msg: "Password incorrect!"});

        const token = createAccessToken ({ id: user._id});
        delete user.password;
        res.status(200).json({token, user, status: true, msg: "Login successful!"})
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error!"})
    }
}