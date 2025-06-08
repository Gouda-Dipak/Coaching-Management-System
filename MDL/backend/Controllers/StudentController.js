const StudentModel = require("../Models/student")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Studentsignup = async (req, res) => {
    console.log(req.body);
    console.log("file is :", req.file);
    const {
        s_id,
        fname,
        mname,
        lname,
        email,
        password,
        dob,
        adharnumber,
        city,
        country,
        adress,
        fee,
        gender,
        mobilenumber,
        s_class,
        s_classId } = req.body

    try {
        const { filename } = req.file
        // Check if the user already exists
        const user = await StudentModel.findOne({ s_id, email });
        if (user) {
            return res.status(200).json({
                message: "Student already exists",
                success: false,
            });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new StudentModel({
            s_id,
            fname,
            mname,
            lname,
            email,
            password: hashedPassword,
            dob,
            adharnumber,
            city,
            country,
            adress,
            fee,
            gender,
            passphoto: filename,
            s_class,
            mobilenumber,
            s_classId
        });
        console.log("New Student: ", newUser)

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
}
const StudentLogin = async (req, res) => {
    try {
        const { s_id, email } = req.body;
        const userid = await StudentModel.findOne({ s_id })
        if (!userid) {
            return res.status(200)
                .json({ message: "StudentID is not exist", success: false })
        }
        const useremail = await StudentModel.findOne({ s_id, email })
        if (!useremail) {
            return res.status(200)
                .json({ message: "Email is not exist", success: false })
        }
        // const result = await bcrypt.compare(password, useremail.password)
        // if (!result) {
        //     return res.status(200)
        //         .json({ message: "Auth failed password is wrong", success: false })
        // }

        const jwttoken = jwt.sign(
            { email: useremail.email, _id: useremail._id },
            process.env.JWT_TOKEN
        )

        const fullname = useremail.fname + " " + useremail.mname + " " + useremail.lname

        res.status(201)
            .json({ message: "login successfully", success: true, jwttoken, s_id, email, _id: useremail._id, name: fullname, s_class: useremail.s_class })


    } catch (error) {
        res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}

const getStudents = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const students = await StudentModel.find({ s_class: id })
        res.status(200).json({ students })
    } catch (error) {
        res.status(500).json({ message: "Server error" + error, success: false })
    }
}

const getStudentsbyclass = async (req, res) => {
    try {
        const { classname } = req.params
        const students = await StudentModel.find({ s_class: classname })
        console.log(students);
        res.status(200).json({ data: students })
    } catch (error) {
        res.status(500).json({ message: "Server error" + error, success: false })
    }
}
async function studentprofile(req, res) {
    try {
        const { id } = req.params
        console.log(id)
        // Check if the user already exists
        const student = await StudentModel.findById(id);
        res.status(200).json({
            message: "Student fetched successfully",
            success: true,
            data: student
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error.message,
            success: false,
        });
    }
}

async function showprofile(req, res) {
    try {
        const { id } = req.params
        console.log(id)
        // Check if the user already exists
        const student = await StudentModel.findById(id);
        res.status(200).json({
            message: "Student fetched successfully",
            success: true,
            data: student
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error.message,
            success: false,
        });
    }
}
const updatestudentdetails = async (req, res) => {
    console.log("body: ", req.body);
    const { fname, mname, lname,dob, adharnumber, city, country,fee, passphoto,mobilenumber} = req.body;
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: "Student ID is required", success: false });
    }

    try {
        const notice = await StudentModel.findByIdAndUpdate(
            id,  // Correctly pass the ID
            { fname, mname, lname,dob, adharnumber, city, country,fee, passphoto,mobilenumber},
            { new: true } // Return the updated document
        );

        if (!notice) {
            return res.status(404).json({ message: "Student not found", success: false });
        }

        return res.status(200).json({ message: "Student Detailes Updated", success: true, date: notice });

    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message, success: false });
    }
};

// const Deletestudent = async (req, res) => {
//     try {
//         const { id } = req.params
//         // const ok = StudentModel.findByIdAndDelete(id)
//         // console.log(ok);
//         console.log(id)
//         const notice = await StudentModel.findByIdAndDelete(id)
//             // console.log(notice)
//         if (!notice) {
//             return res.status()
//                 .json({ message: "Student Deleting Canceled", success: false })
//         }
//         return res.status(201)
//             .json({ message: "Student Deleted SuccessFully", success: true })
//     } catch (error) {
//         return res.status(408)
//             .json({ message: "Server error" + error, success: false })
//     }
// }
const Deletestudent = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await StudentModel.findByIdAndDelete(id);
        if (!teacher) {
            return res.status(404).json({
                message: "Student not found",
                success: false,
            });
        }
        res.status(200).json({
            message: "Student deleted successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error.message,
            success: false,
        });
    }
}

module.exports = { Studentsignup, StudentLogin, getStudents, getStudentsbyclass,showprofile,studentprofile,updatestudentdetails,Deletestudent} 
