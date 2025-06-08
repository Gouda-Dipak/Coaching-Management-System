const FeedbackModel = require("../Models/Feedback")

const StudentFeedback = async (req, res) => {
    console.log("body: ", req.body)
    const {
        s_id,
        name,
        s_class,
        role,
        feedback
    } = req.body


    try {
        const sendfeedback = new FeedbackModel({
            s_class,
            name,
            s_id,
            role,
            feedback
        })

        await sendfeedback.save()

        return res.status(200)
            .json({ message: "Feedback Added", success: true })

    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }

}
async function Getfeedback(req, res) {
    try {
        
        const student = await FeedbackModel.find({});
        res.status(200).json({
            message: "Feedback fetched successfully",
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
module.exports = { StudentFeedback ,Getfeedback}