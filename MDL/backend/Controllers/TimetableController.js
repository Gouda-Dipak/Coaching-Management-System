const TimeTableModel = require("../Models/timetable")
const addTimetable = async (req, res) => {
    try {
        const { filename } = req.file
        console.log(req.file)

        if (!filename) {
            return res.status(400).json({
                message: "File is required",
                success: false,
            });
        }

        const currentDate = new Date();
        const date = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
        const time = currentDate.toTimeString().split(" ")[0]; // HH:MM:SS

        const newTimetable = new TimeTableModel({ filename, date, time });
        await newTimetable.save();

        res.status(201).json({
            message: "Timetable entry added successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error,
            success: false
        });
    }
}

const gettimetable = async (req, res) => {
    try {
        const timetable = await TimeTableModel.find({})
        res.status(200).json({
            message: "Time Table Founded",
            success: true,
            data: timetable
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error,
            success: false
        });
    }
}
// const getlatestTimetable = async (req, res) => {
//     try {
//         const timetable = await TimeTableModel.find({})
//             .sort({ createdAt: -1 })
//             .limit(1);

//         res.status(200).json({
//             message: "Latest Time Table Found",
//             success: true,
//             data: timetable.length > 0 ? timetable[0] : null
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Server error: " + error,
//             success: false
//         });
//     }
// }

const getlatestTimetable = async (req, res) => {
    try {
        const timetable = await TimeTableModel.find({})
            .sort({ _id: -1 }) // Sort by ObjectId (latest first)
            .limit(1);

        res.status(200).json({
            message: "Latest Time Table Found",
            success: true,
            data: timetable.length > 0 ? timetable[0] : null
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error.message,
            success: false
        });
    }
};

const DeleteByTable = async (req, res) => {
    const { id } = req.params
    try {
        const timetable = await TimeTableModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "File Deleted SuccessFully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error: " + error,
            success: false
        });
    }
}

module.exports = { addTimetable, gettimetable, DeleteByTable, getlatestTimetable }
