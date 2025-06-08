const NotesModel = require("../Models/Notes")
const multer = require("multer");
const TeacherNotes = async (req, res) => {
    console.log("body: ", req.body)
    // console.log("file is :", req.file);
    const {
        classname,
        subject
    } = req.body


    try {
        const { filename } = req.file
        console.log("filename: ", filename)
        const c = new NotesModel({
            classname: classname,
            subject: subject,
            notesfille: filename
        })

        await c.save()

        return res.status(200)
            .json({ message: "Notice Added", success: true })

    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}
const getallnotes = async (req, res) => {
    const { classname } = req.params

    try {
        const notice = await NotesModel.find({ classname: classname })

        return res.status(200)
            .json({ message: "Notice Founded", success: true, data: notice })
    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}
const getStudentsbyclass = async (req, res) => {
    try {
        const { classname } = req.params
        const students = await NotesModel.find({ classname: classname })
        console.log(students);
        res.status(200).json({ data: students })
    } catch (error) {
        res.status(500).json({ message: "Server error" + error, success: false })
    }
}
const getsubjects = async (req, res) => {
    try {
        const { subjectName } = req.params
        const sub = await NotesModel.find({ subject: subjectName })
        console.log(sub);
        res.status(200).json({ data: sub })
    } catch (error) {
        res.status(500).json({ message: "Server error" + error, success: false })
    }
}

module.exports = { TeacherNotes, getallnotes, getStudentsbyclass, getsubjects }