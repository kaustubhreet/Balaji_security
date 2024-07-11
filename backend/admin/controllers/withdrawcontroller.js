const User=require('../../mobileApi/models/user');
const {catchBlock}=require('../../config/helper');
const Withdrawal = require('../../mobileApi/models/withdrawl');

module.exports={

    userWithdrawRequest:async(req,res)=>{
        try {
            const { status } = req.params; // Assuming you pass 'status' as a parameter
                //console.log(req.params)
            const result = await Withdrawal.aggregate([
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
                        tds: 1,
                        date: 1,
                        time: 1,
                        status: 1
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

    updateUserWithdrawStatus:async(req,res)=>{
        try {
            const { memberId } = req.params;
            const newStatus = req.body.status;
    
            if (!newStatus || !['approved', 'rejected'].includes(newStatus)) {
                return catchBlock("Invalid status", res, 404, 0, {}, req.headers['requestby']);
            }
    
            const updatedWithdrawStatus = await Withdrawal.findByIdAndUpdate(
                { _id: memberId },
                { status: newStatus },
                { new: true }
            );
               // console.log(updatedWithdrawStatus)
            if (!updatedWithdrawStatus) {
                return catchBlock("Fund data not found", res, 404, 0, {}, req.headers['requestby']);
            }
            if (newStatus === 'approved') {
                updatedWithdrawStatus.paidTime = new Date().toLocaleTimeString();
                updatedWithdrawStatus.paidDate = new Date();
                updatedWithdrawStatus.fundWallet-=updatedWithdrawStatus.amount;
                await updatedWithdrawStatus.save();
                const user = await User.findOne({memberid:updatedWithdrawStatus.memberId});
                if (user) {
                    // Update the user's fundWallet
                    user.fund_wallet= updatedWithdrawStatus.amount-updatedWithdrawStatus; 
                    await user.save();

                }
            }
    
            return catchBlock("Successfully updated status", res, 200, 1, { updatedWithdrawStatus }, req.headers['requestby']);
        } catch (error) {
            console.error(error);
            return catchBlock("Internal server error", res, 500, 0, {}, req.headers['requestby']);
        }
    }
}