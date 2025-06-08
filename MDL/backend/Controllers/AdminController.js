const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel =require("../Models/admin.js")
const signup = async (req, res) => {

            
    console.log("file:",req.file);
    
    try {
        const { filename } = req.file
        const { fname,mname,lname,dob,mobileNumber,email,password,country,city,address,pinCode} = req.body;
        console.log("Your request body is: ", req.body);

        // Check if the user already exists
        const user = await AdminModel.findOne({ email });
        if (user) {
            return res.status(200).json({
                message: "User already exists",
                success: false,
            });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new AdminModel({
            fname,
            mname,
            lname,
            dob,
            email,
            password:hashedPassword,
            mobileNumber,
            country,
            city,
            address,
            pinCode,
            img:filename
        });
        console.log("New users: ", newUser)

        // Save the user to the database
        await newUser.save()
        return res.status(201).json({
            message: "Signup successful",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error.message,
            success: false,
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AdminModel.findOne({ email })

        if (!user) {
            return res.status(200)
                .json({ message: "Auth failed Admin is not exist", success: false })
        }

        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(200)
                .json({ message: "Auth failed password is wrong", success: false })
        }

        const jwttoken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_TOKEN
        )

        const fullname = user.fname+" " + user.mname +" " + user.lname

        res.status(201)
            .json({ message: "login successfully", success: true, jwttoken, email, name:fullname, _id: user._id })


    } catch (error) {
        res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}
async function adminprofile(req, res) {
    try {
        const {id} = req.params
        // Check if the user already exists
        const user = await AdminModel.findById(id);
        res.status(200).json({
            message: "Admin fetched successfully",
            success: true,
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error.message,
            success: false,
        });
    }
}

module.exports = { 
    signup,
    login,
    adminprofile
}
