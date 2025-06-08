const TeacherNoticeModel = require("../Models/teachernotice")

const Teachernotice = async (req, res) => {
    console.log("body: ", req.body)
    const {
        noticedescription,
        title,
        selectedclass,
        date
    } = req.body


    try {
        const c = new TeacherNoticeModel({
            noticedescription: noticedescription,
            title: title,
            selectedclass: selectedclass,
            date: date
        })

        await c.save()

        return res.status(200)
            .json({ message: "Notice Added", success: true })

    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}

async function GetallNotice(req, res) {
    try {
       // Check if the user already exists
        const user = await TeacherNoticeModel.find({}).sort({date: -1});
        console.log(user);
      res.status(200).json({
            message: "Teacher fetched successfully",
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
async function Getclasses(req, res) {
    try {
        const { classname } = req.params
       // Check if the user already exists
        const user = await TeacherNoticeModel.find({selectedclass:classname}).sort({date: -1});
        console.log(user);
      res.status(200).json({
            message: "Teacher fetched successfully",
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
const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const notice = await TeacherNoticeModel.findByIdAndDelete(id)

        if (!notice) {
            return res.status(200)
                .json({ message: "Notice Deleting Canceled", success: false })
        }

        return res.status(200)
            .json({ message: "Notice Deleted SuccessFully", success: true })
    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}
module.exports = { Teachernotice , GetallNotice, deleteById,Getclasses}