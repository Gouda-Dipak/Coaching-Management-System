const AttendanceModel = require("../Models/Attendance");

const markAttendance = async (req, res) => {
    console.log(req.body);
    try {
        const { classname, subject, attendance } = req.body;
        const date = new Date().toISOString().split("T")[0]

        const newAttendance = new AttendanceModel({ date, classname, subject, records: attendance });
        await newAttendance.save();

        res.status(201).json({ message: "Attendance recorded successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAttendance = async (req, res) => {
    try {
        const { classname, subject, date } = req.params;
        const attendance = await AttendanceModel.findOne({ classname, subject, date })
            .populate({
                path: "records.studentId",
                select: "fname mname lname"
            });

        console.log(attendance)
        if (!attendance) {
            return res.status(404).json({ message: "No attendance found" });
        }

        res.status(200).json({ data: attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateAttendance = async (req, res) => {
    try {

        const { records } = req.body;

        const updatedAttendance = await AttendanceModel.findByIdAndUpdate(
            req.body._id,
            { records },
            { new: true }
        );

        if (!updatedAttendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }

        res.status(200).json({ message: "Attendance updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function getattendence(req, res) {
    try {
        // const { sid } = req.body;
        const student = await AttendanceModel.find();
        res.status(200).json({
            message: "data fetched successfully",
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
module.exports = { markAttendance, getAttendance, updateAttendance ,getattendence}