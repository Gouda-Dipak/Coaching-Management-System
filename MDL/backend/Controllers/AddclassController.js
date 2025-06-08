const ClassModel = require("../Models/class")
const StudentModel = require("../Models/student")
const addclass = async (req, res) => {

    console.log("body: ", req.body)
    const {
        className
    } = req.body


    try {
        const c = new ClassModel({
            classname: className
        })

        await c.save()

        return res.status(200)
            .json({ message: "Class Added", success: true })

    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}

const getclasses = async (req, res) => {
    try {
        const classes = await ClassModel.find({})
        return res.status(200).json({ message: "Classes fetched", success: true, data: classes })
    } catch (error) {
        return res.status(408).json({ message: "Server error" + error, success: false })
    }
}
const classbystudent = async (req, res) => {
    try {
        // Step 1: Fetch all classes
        const classes = await ClassModel.find({}, "_id classname"); // Fetch only _id and name

        // Step 2: Fetch student count grouped by classId
        const studentCounts = await StudentModel.aggregate([
            { $group: { _id: "$s_classId", count: { $sum: 1 } } } // Count students per class
        ]);

        // Step 3: Map class data with student count
        const responseData = classes.map(cls => {
            // Find the student count for this class
            const studentCount = studentCounts.find(sc =>
                sc._id.toString() === cls._id.toString()
            )?.count || 0;

            return {
                class_id: cls._id,
                class_name: cls.classname,
                student_count: studentCount
            };
        });

        console.log(responseData);


        return res.status(200).json({
            message: "Classes with student count fetched successfully",
            success: true,
            data: responseData
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error: " + error,
            success: false
        });
    }
};

const Deleteclass = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find and Delete the Class
        const clas = await ClassModel.findByIdAndDelete(id);

        if (!clas) {
            return res.status(404).json({ 
                message: "Class not found or already deleted", 
                success: false 
            });
        }

        // Step 2: Delete all students associated with this class
        await StudentModel.deleteMany({ s_classId: id });

        return res.status(200).json({ 
            message: "Class and associated students deleted successfully", 
            success: true 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Server error: " + error, 
            success: false 
        });
    }
};

// const getclassByid 

module.exports = { addclass, getclasses, Deleteclass, classbystudent }