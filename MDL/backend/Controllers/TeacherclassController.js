const TeacherClassModel = require("../Models/TeacherClass")
async function Teacherclass(req, res) {
    console.log("the body is :: ", req.body);
    const { className, TeacherId } = req.body;

    try {
        const teacherclass = new TeacherClassModel({
            className: className,
            TeacherId: TeacherId
        });

        await teacherclass.save()

        return res.status(200).json({ message: "Teacher class Added", success: true });

    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message, success: false });
    }
}

const displayteacherclasses = async (req, res) => {
    const { classname } = req.params
    try {
        const teacherClasses = await TeacherClassModel.find({ className: classname })
            .populate("TeacherId", "t_id s_name name lname") // Fetch Teacher ID, First Name, and Last Name
            .populate("SubjectId", "subjectName"); // Fetch Subject Name

        res.json({ success: true, data: teacherClasses });
    } catch (error) {
        console.error("Error fetching teacher classes:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
const updatesubject = async (req, res) => {
    try {
        const { id } = req.params; // Get Teacher-Class ID from URL
        const { SubjectName } = req.body; // Get SubjectName from request body

        const updatedTeacherClass = await TeacherClassModel.findByIdAndUpdate(
            id,
            { SubjectName },
            { new: true } // Return the updated document
        );

        if (!updatedTeacherClass) {
            return res.status(404).json({ success: false, message: "Entry not found" });
        }

        res.json({ success: true, message: "Subject updated successfully", data: updatedTeacherClass });
    } catch (error) {
        console.error("Error updating subject:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
const DeleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        // Delete teacher from the class
        const result = await TeacherClassModel.findOneAndDelete({ id });

        if (!result) {
            return res.status(404).json({ success: false, message: "Teacher not found in any class" });
        }

        res.json({ success: true, message: "Teacher removed from class successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


module.exports = { Teacherclass, displayteacherclasses, updatesubject, DeleteTeacher};