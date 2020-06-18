const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

let upload = multer({storage: storage}).single('file');


myDownload = (req, res) => {

    let parent = path.dirname(__dirname)

    const file = parent +  '/Downloads/updated-accounts.xlsx';
    res.download(file); // Set disposition and send it.
};

myUpload = (req, res) => {

    const fs = require('fs');
    const directory = './Uploads';


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


                        res.setHeader(
                            'Content-Disposition', 'attachment; filename=index.js; modification-date="Wed, 12 Feb 1997 16:29:51 -0500"'
                        );

                        res.status(200).json();
                    })
                }
            )
        }
    });
}


myPostTransaction = async (req, res) => {


    const fs = require('fs');
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

                    let wrongAccount = false;
                    let message = ""
                    if (originIndex === -1){
                        wrongAccount = true;
                        message =   "اشتباه است!" + originAccount + "شماره حساب مبداء به شماره "

                    } else if (destinationIndex === -1) {
                        wrongAccount = true;
                        message =   "اشتباه است!" + destinationAccount + "شماره حساب مقصد به شماره "
                    }

                    if (wrongAccount){
                        return res.status(201).json({message: message});
                    }

                    backup[originIndex]["accountBalance"] -= amount;
                    backup[destinationIndex]["accountBalance"] += parseInt(amount);

                    // let str = JSON.stringify(backup, null, 2); // spacing level = 2
                    // console.log(str)

                    const json2xls = require('json2xls');
                    let xls = json2xls(backup);

                    fs.writeFileSync('./Downloads/updated-accounts.xlsx', xls, 'binary');
                    fs.writeFileSync('./Uploads/accounts.xlsx', xls, 'binary');
                    return res.status(200).json()

                }
            })

        }
    });

    // return res.status(200).json();
};


module.exports = {
    myDownload,
    myUpload,
    myPostTransaction,
};
