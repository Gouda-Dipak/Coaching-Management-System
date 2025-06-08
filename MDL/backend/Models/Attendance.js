const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  classname: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  records: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
      },
    },
  ],
});

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
module.exports = AttendanceModel;
