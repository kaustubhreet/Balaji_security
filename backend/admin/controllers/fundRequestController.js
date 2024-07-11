const Fund=require('../../mobileApi/models/fund');
const {catchBlock}=require('../../config/helper')
const User=require('../../mobileApi/models/user')




module.exports={
    getUserFundRequest: async (req, res) => {
        try {
            const { status } = req.params; // Assuming you pass 'status' as a parameter
           // console.log(status)
            
            const result = await Fund.aggregate([
                {
                    $match: { status: status } // Filter funds by status
                },
                {
                    $lookup: {
                        from: "users", // The name of the User collection
                        localField: "memberId",
                        foreignField: "memberid",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user" // Unwind the user array created by $lookup
                },
                {
                    $project: {
                        _id: 0,
                        fullName: "$user.fullname",
                        mobileNumber: "$user.mobile",
                        emailId: "$user.emailid",
                        memberId: "$user.memberid",
                        amount: 1,
                        transactionId: 1,
                        time: 1,
                        date: 1,
                        status: 1,
                        action: 1
                    }
                }
            ]);
            if (!result || result.length === 0) {
                return catchBlock("Data not found", res, 404, 0, {}, req.headers['requestby']);
            }
    
            return catchBlock("Data successfully found", res, 200, 1, { fundRequestData: result }, req.headers['requestby']);
        } catch (err) {
            console.log(err);
            return catchBlock("Internal server error", res, 500, 0, {}, req.headers['requestby']);
        }
    },
    

updateUserFundRequest: async (req, res) => {
    try {
        const { memberId } = req.params;
        const newStatus = req.body.status;
        const message = req.body.message;

        if (!newStatus || !['approved', 'rejected'].includes(newStatus)) {
            return catchBlock("Invalid status", res, 404, 0, {}, req.headers['requestby']);
        }

        const updatedFundStatus = await Fund.findByIdAndUpdate(
            { _id: memberId },
            { status: newStatus, message: message },
            { new: true }
        );

        if (!updatedFundStatus) {
            return catchBlock("Fund data not found", res, 404, 0, {}, req.headers['requestby']);
        }
        
        if (newStatus === 'approved') {
            const user = await User.findOne({memberid:updatedFundStatus.memberId});
            if (user) {
                // Update the user's fundWallet
                user.wallet += updatedFundStatus.amount; 
                await user.save();
            }
        }

        return catchBlock("Successfully updated status", res, 200, 1, { updatedFundStatus }, req.headers['requestby']);
    } catch (error) {
        console.error(error);
        return catchBlock("Internal server error", res, 500, 0, {}, req.headers['requestby']);
    }
},


}

