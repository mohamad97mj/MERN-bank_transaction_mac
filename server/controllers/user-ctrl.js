const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load input validation
// const validateLoginInput = require("../validation/Auth");
// const validateRegisterInput = require("../validation/register");

// Load Auth model
const Auth = require("../models/user-auth");
const Form = require("../models/user-main");
const Profile = require("../models/user-profile");

// const clone = require('rfdc')();
const clone = (items) => items.map(item => Array.isArray(item) ? this.clone(item) : item);

var multer = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage}).single('file')

myUpload = (req, res) => {

    const fs = require('fs');
    const directory = './Uploads';
    const path = require('path');


    fs.readdir(directory, (err, files) => {
        if (err) console.error(err);

        else {

            return new Promise(function (resolve, reject) {

                let i = 0;
                let l = files.length;
                if (l === 0) resolve("ok")
                for (const file of files) {
                    fs.unlink(path.join(directory, file), err => {
                        if (err) reject(err);
                        else {
                            i++;
                            if (i === l) {
                                resolve("ok");
                            }
                        }

                    });
                }
            }).then(
                function (result) {
                    upload(req, res, function (err) {
                        if (err instanceof multer.MulterError) {
                            return res.status(500).json(err)
                        } else if (err) {
                            return res.status(500).json(err)
                        } else if (!req.file) {
                            return res.status(201).json({
                                message: "فایلی برای آپلود انتخاب نشده است"
                            })
                        }
                        return res.status(200).json()
                    })
                }
            )
        }
    });
}


// @route POST api/users/register
// @desc Register user
// @access Public
// myRegister = (req, res) => {
// Form validation

// const {errors, isValid} = validateLoginInput(req.body);

// Check validation
// if (!isValid) {
//     return res.status(400).json(errors);
// }

// Auth.findOne({username: req.body.username}).then(user => {
//     if (user) {
//         return res.status(400).json({username: "Username already exists"});
//     } else {
//         const newUser = new Auth({
//             username: req.body.username,
//             password: req.body.password
//         });

// Hash password before saving in database
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
// });
// });
//         }
//     });
// };

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
myLogin = (req, res) => {
    // Form validation
    // const {errors, isValid} = validateLoginInput(req.body);

    // Check validation
    // if (!isValid) {
    //
    //     return res.status(400).json(errors);
    // }
    const username = req.body.username;
    const password = req.body.password;


    Auth.findOne({username: username}).then(user => {

        if (!user) {
            return res.status(404).json({usernamenotfound: "username not found"});
        }


        const isMatch = password === user.password;

        // Check password
        // bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {

            // Auth matched
            // Create JWT Payload

            const payload = {
                username: user.username,
            };

            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        } else {
            return res
                .status(400)
                .json({passwordincorrect: "Password incorrect"});
        }
        // });
    });
};

//
getProfileByUsername = async (req, res) => {

    await Profile.find({username: req.body.username}, (err, profiles) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).json({success: true, data: profiles})
    }).catch(err => console.log(err))
};
//
//
getFormByUsername = async (req, res) => {

    // console.log("username here in getForm is : " + req.body.username);
    await Form.find({username: req.body.username}, (err, forms) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).json({success: true, data: forms})
    }).catch(err => console.log(err))
};
//
myPostProfile = (req, res) => {


    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a profile',
        })
    }

    'use strict';
    const util = require('util');

    const profile = new Profile(
        // body
        {
            date: body.date,
            username: body.username,
            name: body.name,
            nationalCode: body.nationalCode,
            state: body.state,
            city: body.city,
            address: body.address,
            postalCode: body.postalCode,
            telephone: body.telephone,
            lastLicenseNumber: body.lastLicenseNumber,
            lastLicenseValidityDate: body.lastLicenseValidityDate,
            registerNumber: body.registerNumber,
            manager: body.manager,
            socialNetworkAccess: body.socialNetworkAccess,
            mobile: body.mobile,
        }
    );


    if (!profile) {
        console.log("not a profile");
        return res.status(400).json({success: false, error: err})
    }
    // const util = require('util');
    // console.log(util.inspect(body, {depth: null}));

    // delete profile._id;

    // profile
    profile
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: profile._id,
                message: 'Profile created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Profile not created!',
            })
        })

    // return true;
};

myPostForm = (req, res) => {

    const body = req.body;

    const util = require('util');

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a profile',
        })
    }


    const form = new Form(
        // body
        {
            username: body.username,
            date: body.date,
            data: body.data,
        }
    );

    if (!form) {
        return res.status(400).json({success: false, error: err})
    }

    form
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: form._id,
                message: 'Form created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Form not created!',
            })
        })
};


myPostTransaction = async (req, res) => {


    const fs = require('fs');
    const path = require('path');
    let XLSX = require('xlsx')

    const directory = './Uploads';

    // return res.status(205).json()

    fs.readdir(directory, function (err, files) {
        if (err) {
            res.status(500).json(err)
        } else if (!files.length) {
            return res.status(201).json({
                message: "ابتدا فایل اطلاعات حساب ها را آپلود کنید"
            })
        } else {

            const body = req.body;

            if (!body) {
                return res.status(400).json({
                    success: false,
                    error: 'You must provide a transaction',
                })
            }

            let originAccount = body.originAccount;
            let destinationAccount = body.destinationAccount;
            let amount = body.amount;

            if (!originAccount || !destinationAccount || !amount) return res.status(201).json({message: "لطفا تمام اطلاعات خواسته شده را تکمیل نمایید"})

            fs.readdir(directory, (err, files) => {
                if (err) {
                    res.status(500).json(err)
                } else {

                    let file = files[0];

                    let filepath = path.join(directory, file);

                    let workbook = XLSX.readFile(filepath);
                    let sheet_name_list = workbook.SheetNames;
                    let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                    let backup = xlData

                    const findIndex = (accountNumber) => {
                        for (let i = 0; i < xlData.length; i++) {
                            if (xlData[i]["accountNumber"] == accountNumber) {
                                return i;
                            }
                        }
                        return -1;
                    }

                    let originIndex = findIndex(originAccount)
                    let destinationIndex = findIndex(destinationAccount)

                    backup[originIndex]["accountBalance"] -= amount;
                    backup[destinationIndex]["accountBalance"] += parseInt(amount);

                    // let str = JSON.stringify(backup, null, 2); // spacing level = 2
                    // console.log(str)

                    const json2xls = require('json2xls');
                    let xls = json2xls(backup);

                    fs.writeFileSync('../client/client-app/public/updated-accounts.xlsx', xls, 'binary');

                }
            })

            return res.status(200)
        }
    });
};


module.exports = {
    // myRegister,
    myLogin,
    getProfileByUsername,
    getFormByUsername,
    myPostProfile,
    myPostForm,
    myUpload,
    myPostTransaction,
};
