var Service = require("../Service/service");
const readXlsxFile = require("read-excel-file/node");
(path = require("path")),
  (filePath = path.join(__dirname, "templateShedule.xlsx"));
const moment = require("moment");

exports.get = async function (req, res) {
  try {
    
    var arr = [];
    readXlsxFile(filePath).then((rows) => {
      for (let i = 1; i < rows.length; i++) {
        let checkDate = moment(rows[i][0], "YYYY-MM-DD", true).isValid();
        if (
          rows[i][0] !== null &&
          checkDate &&
          rows[i][1] !== null &&
          rows[i][2] !== null &&
          rows[i][3] !== null
        ) {
          arr.push(rows[i]);
        } else {
          res.send({
            messageCode: "error",
            message: "check detail of Date,employeeId,workingtype,name",
          });
          return;
        }
      }
      //  console.log("=========", arr);
      Service.templateShedules(arr);
      res.send({
        messageCode: "success.insert successfully",
        message: "Template Schedule insert successfully.",
      });
      return;
    });
    //console.log(arr)
  } catch (e) {
    console.log(e);
  }
};

exports.submit = async function (req, res) {
  try {
    if (req.body.type === null) {
      res.send({
        messageCode: "error",
        message: "Type is missing.",
      });
      return;
    }

    if (req.body.type.toUpperCase() === "CONVEYANCE") {
      if (
        req.body.dateFrom !== null &&
        req.body.dateTo !== null &&
        req.body.purpose !== null &&
        req.body.mode !== null &&
        req.body.km !== null &&
        req.body.invNo !== null &&
        req.body.amt !== null
      ) {
        console.log(req.body.purpose);
        await Service.Reimbursements(req.body);
        res.send({
          messageCode: "success.insert successfully",
          message: "Reimbursements conveyance insert successfully.",
        });
        return;
      }
    }
    if (req.body.type.toUpperCase() === "HOTEL") {
      if (
        req.body.dateFrom !== null &&
        req.body.dateTo !== null &&
        req.body.hotelName !== null &&
        req.body.invNo !== null &&
        req.body.amt !== null
      ) {
        await Service.Reimbursements(req.body);
        res.send({
          messageCode: "success.insert successfully",
          message: "Reimbursements Hotel insert successfully.",
        });
        return;
      }
    }
    res.send({
      messageCode: "error",
      message: "Check parameter.",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.retriveAll = async function (req, res) {
  try {
    var result = await Service.retriveAll();
    res.send(result);
  } catch (e) {
    console.log(e);
  }
};

exports.retriveOneEntry = async function (req, res) {
  try {
    var result = await Service.retriveOneEntry();
    res.send(result);
  } catch (e) {
    console.log(e);
  }
};
