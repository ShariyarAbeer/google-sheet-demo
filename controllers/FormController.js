const FormModel = require('../Models/formModel');
const FormStepsModel = require('../Models/formStepsModel');
const UserModel = require('../Models/userModel');
const FormStepsSchema = require('../Models/formStepsModel');
const FormItemSchema = require('../Models/formItemModel');
const makeToken = require('../helpers/utls');
const ItemOptionsModel = require('../models/itemOptionsModel');
const FormItemModel = require('../Models/formItemModel');

module.exports = {
    createForm: async (req, res) => {
        try {
            let formToken = makeToken.makeToken({ label: 'formToken' })
            let formStepsToken = makeToken.makeToken({ label: 'formStepsToken' })

            const { usertoken, sessiontoken } = req.headers
            const { title, details } = req.body;

            let proceed = true;
            let userCheck = await UserModel.find({ userToken: usertoken });
            // console.log(userCheck);
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
                    formToken: formToken,
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

    },
    fromItemAdd: async (req, res) => {
        try {
            let formItem = makeToken.makeToken({ label: 'formItem' })
            const { usertoken, sessiontoken } = req.headers
            const { formToken, stepsToken, image, title, inputType, require } = req.body;

            let proceed = true;
            let userCheck = await UserModel.find({ userToken: usertoken });
            let formInfo = await FormStepsSchema.find({ token: stepsToken });
            // console.log(userCheck);
            if (userCheck.length == 0) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "User already in database"
                    }
                })

            }
            if (formInfo[0].createBy != usertoken || formInfo[0].token != stepsToken || formInfo[0].formToken != formToken) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "This is not your Form"
                    }
                })
            }
            if (makeToken.file.includes(inputType) === false) {
                proceed = false;
                res.send({
                    type: "Error inputType",
                    data: {
                        msg: "inputType thik kor sala"
                    }
                })
            }


            if (proceed) {
                let formItemToken = makeToken.makeToken({ label: 'formItemToken' })
                let totalCount = await FormItemModel.find({ formToken: formToken, stepsToken: stepsToken });
                let formItemElement = await FormItemSchema.create({
                    token: formItemToken,
                    formToken: formToken,
                    stepsToken: stepsToken,
                    image: image,
                    title: title,
                    inputType: inputType,
                    require: require,
                    positionKey: totalCount.length + 1,
                    status: "Active",
                    existence: 1,
                    createBy: usertoken,
                    sessionToken: sessiontoken
                })
                res.send({
                    type: "Form Created",
                    data: {
                        msg: formItemElement
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

    },
    fromNextStepsAdd: async (req, res) => {
        try {
            let formItem = makeToken.makeToken({ label: 'formItem' })
            const { usertoken, sessiontoken } = req.headers
            const { formToken, previousStepsToken, title, details, nextStepsToken } = req.body;

            let proceed = true;
            let userCheck = await UserModel.find({ userToken: usertoken });
            let formInfo = await FormStepsSchema.find({ formToken: formToken });
            // console.log(userCheck);
            if (userCheck.length == 0) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "User already in database"
                    }
                })

            }
            if (formInfo[0].createBy != usertoken || formInfo[0].formToken != formToken || formInfo[0].previousStepsToken != "") {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "This Form si not in database or this page have"
                    }
                })
            }
            if (proceed) {
                let formNextStepsToken = makeToken.makeToken({ label: 'formNextStepsToken' })
                let formItemElement = await FormStepsSchema.create({
                    token: formNextStepsToken,
                    formToken: formToken,
                    title: title,
                    details: details,
                    previousStepsToken: previousStepsToken,
                    nextStepsToken: nextStepsToken,
                    status: "Active",
                    existence: 1,
                    createBy: usertoken,
                    sessionToken: sessiontoken
                })
                let updatePreviousFormToken = await FormStepsSchema.findOneAndUpdate(
                    { 'sessionToken': sessiontoken },
                    {
                        '$set': {
                            nextStepsToken: formNextStepsToken
                        }
                    },
                    { new: true }
                );
                res.send({
                    type: "Form steps 2 Created",
                    data: {
                        msg: formItemElement
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

    },
    itemOptionsNew: async (req, res) => {
        try {
            let formItem = makeToken.makeToken({ label: 'formItem' })
            const { usertoken, sessiontoken } = req.headers
            const { formToken, stepsToken, itemToken, itemType, data1 } = req.body;

            let proceed = true;
            let userCheck = await UserModel.find({ userToken: usertoken });
            let formInfo = await FormItemSchema.find({ formToken: formToken });
            // console.log(userCheck);
            if (userCheck.length == 0) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "User already in database"
                    }
                })

            }
            if (formInfo[0].createBy != usertoken || formInfo[0].formToken != formToken || formInfo[0].stepsToken != stepsToken || formInfo[0].token != itemToken) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "This Form si not in database or this page have"
                    }
                })
            }
            if (makeToken.file.includes(itemType) === false) {
                proceed = false;
                res.send({
                    type: "Error inputType",
                    data: {
                        msg: "itemType thik kor sala 1"
                    }
                })
            }
            let orderList = []
            for (let i = 0; i < data1.length; i++) {
                if (data1[i].titleType === 'other') {
                    orderList.push(i)
                }
            }
            console.log(orderList);
            if (orderList.length == 1) {
                let lastIndex = data1.length - 1;
                if (orderList[0] !== lastIndex) {
                    proceed = false;
                    res.send({
                        type: "Error inputType",
                        data: {
                            msg: "itemType thik kor sala 2"
                        }
                    })
                }
            } else {
                proceed = false;
                res.send({
                    type: "Error inputType",
                    data: {
                        msg: "itemType thik kor sala 3"
                    }
                })
            }
            // if (data.length) {
            //     proceed = false;
            //     // res.send({
            //     //     type: "Error inputType",
            //     //     data: {
            //     //         msg: "itemType thik kor sala"
            //     //     }
            //     // })
            // }
            if (proceed) {

                let itemOptionToken = makeToken.makeToken({ label: 'formNextStepsToken' });
                let formItemElement;
                for (let i = 0; i < data1.length; i++) {

                    formItemElement = await ItemOptionsModel.create({
                        token: itemOptionToken,
                        formToken: formToken,
                        stepsToken: stepsToken,
                        itemToken: itemToken,
                        itemType: itemType,
                        title: data1[i].title,
                        titleType: data1[i].titleType,
                        status: "Active",
                        existence: 1,
                        createBy: usertoken,
                        sessionToken: sessiontoken
                    })
                }
                res.send({
                    type: "Form steps 2 Created",
                    data: {
                        msg: formItemElement
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