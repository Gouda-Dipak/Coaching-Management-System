const NoticeModel = require("../Models/notice")

const addnotice = async (req, res) => {
    console.log("body: ", req.body)
    const {
        title,
        date,
        description,
        name,
        role
    } = req.body


    try {
        const notice = new NoticeModel({
            title,
            date,
            description,
            name,
            role
        })

        await notice.save()

        return res.status(200)
            .json({ message: "Notice Added", success: true })

    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }

}
const updateNotice = async (req, res) => {
    console.log("body: ", req.body);

    const { title, date, description, name, role } = req.body;
    const { id } = req.params // Ensure 'id' is provided

    if (!id) {
        return res.status(400).json({ message: "Notice ID is required", success: false });
    }

    try {
        const notice = await NoticeModel.findByIdAndUpdate(
            id,  // Correctly pass the ID
            { title, date, description, name, role },
            { new: true } // Return the updated document
        );

        if (!notice) {
            return res.status(404).json({ message: "Notice not found", success: false });
        }

        return res.status(200).json({ message: "Notice Updated", success: true, date: notice });

    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message, success: false });
    }
};



const getnotice = async (req, res) => {

    try {
        const notice = await NoticeModel.find({ role: { $in: ["Teacher","Both"] } });

        return res.status(200)
            .json({ message: "Notice Founded", success: true, data: notice })
    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}
const getnoticeInstudent = async (req, res) => {

    try {
        const notice = await NoticeModel.find({ role: { $in: ["Student", "Both"] } });

        return res.status(200)
            .json({ message: "Notice Founded", success: true, data: notice })
    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}
const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const notice = await NoticeModel.findByIdAndDelete(id)

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

const FindByIdNotice = async (req, res) => {

    const { id } = req.params

    try {
        const notice = await NoticeModel.findById(id)

        return res.status(200)
            .json({ message: "Notice Founded", success: false, data: notice })
    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}
const AllNoticeDesplayInHome = async (req, res) => {

    try {
        const notice = await NoticeModel.find({})

        return res.status(200)
            .json({ message: "Notice Founded", success: false, data: notice })
    } catch (error) {
        return res.status(408)
            .json({ message: "Server error" + error, success: false })
    }
}

module.exports = {
    addnotice,
    getnotice,
    deleteById,
    FindByIdNotice,
    updateNotice,
    getnoticeInstudent,
    AllNoticeDesplayInHome   
}