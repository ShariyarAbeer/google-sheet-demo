const FormModel = require('../Models/formModel');
const FormStepsModel = require('../Models/formStepsModel');
const UserModel = require('../Models/userModel');
const makeToken = require('../helpers/utls');

module.exports = {
    createForm: async (req, res) => {
        try {
            let formToken = makeToken.makeToken({ label: 'formToken' })
            const { usertoken, sessiontoken } = req.headers
            const { title, details } = req.body;

            let proceed = true;
            let userCheck = await UserModel.find({ userToken: usertoken });
            console.log(userCheck);
            if (userCheck.length == 0) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "User already in database"
                    }
                })

            }
            if (proceed) {
                let createFormDone = await FormModel.create({
                    token: formToken,
                    title: title,
                    details: details,
                    status: "Active",
                    existence: 1,
                    createBy: usertoken,
                    sessionToken: sessiontoken
                })
                let formStepsModel = await FormStepsModel.create({
                    token: formToken,
                    title: "",
                    details: "",
                    previousStepsToken: "",
                    nextStepsToken: "",
                    status: "Active",
                    existence: 1,
                    createBy: usertoken,
                    sessionToken: sessiontoken
                })
                res.send({
                    type: "Form Created",
                    data: {
                        msg: createFormDone
                    }
                })
            }

        } catch (error) {

            res.send({
                type: "Catch Error",
                data: error
            })
            console.log(error);
        }

    }
}