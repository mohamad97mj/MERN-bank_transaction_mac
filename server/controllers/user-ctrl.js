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

            return res.status(200).json()
        }
    });

    // return res.status(200).json();
};


module.exports = {

    myUpload,
    myPostTransaction,
};
