// const SubjectModel = require("../Models/Subject");

// const Addsubject = async (req, res) => {
//         console.log(req.body);

//         const { subjectCode, subjectName } = req.body
//     try {
//         // Check if the user already exists
//         const user = await SubjectModel.findOne({ subjectCode });
//         if (user) {
//             return res.status(200).json({
//                 message: "Subject Code already exists",
//                 success: false,
//             });
//         }
//         // Create a new user
//         const newSub = new SubjectModel({
//             subjectCode,
//             subjectName,
//         });
//         console.log("New Subject: ", newSub)

//         // Save the user to the database
//         await newSub.save()
//         return res.status(201).json({
//             message: "Subject Added successfully",
//             success: true,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Server error: " + error.message,
//             success: false,
//         });
//     }
// }

// module.exports = { Addsubject }

const SubjectModel = require("../Models/Subject");

const Addsubject = async (req, res) => {
    console.log(req.body);

    const subjects = req.body; // Expecting an array of subjects

    if (!Array.isArray(subjects)) {
        return res.status(400).json({
            message: "Invalid data format. Expected an array of subjects.",
            success: false,
        });
    }

    try {
        let addedSubjects = [];
        let existingSubjects = [];

        for (const subject of subjects) {
            const { subjectCode, subjectName } = subject;

            // Check if the subject already exists
            const existingSubject = await SubjectModel.findOne({ subjectCode });

            if (existingSubject) {
                existingSubjects.push(subjectCode);
                continue; // Skip this subject if it already exists
            }

            // Create new subject
            const newSub = new SubjectModel({ subjectCode, subjectName });
            await newSub.save();
            addedSubjects.push(subjectCode);
        }

        return res.status(201).json({
            message: "Subjects processed successfully",
            success: true,
            addedSubjects,
            existingSubjects,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error.message,
            success: false,
        });
    }
};


const getSubjects = async (req, res) => {
    try {
        // Check if the user already exists
        const user = await SubjectModel.find({})
        console.log(user);
        res.status(200).json({
            message: "Subject fetched successfully",
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
const DeleteSubject = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const notice = await SubjectModel.findByIdAndDelete(id)

        if (!notice) {
            return res.status(200)
                .json({ message: "Subject Deleting Canceled", success: false })
        }

        return res.status(200)
            .json({ message: "Subject Deleted SuccessFully", success: true })
    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}
module.exports = { Addsubject, getSubjects ,DeleteSubject};
