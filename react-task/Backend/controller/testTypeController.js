const response = require("../config/response");
const { Validator } = require("node-input-validator");
const testType = require("../model/testType");

//------------------------------------------CREATE THE TEST TYPE INFORMATION

exports.createTestType = async (req, res) => {
  let reqData = req.body;
  try {
    let validate = new Validator(reqData, {
      test_type: "required",
    });
    let matched = await validate.check();
    if (!matched) {
      return response.returnFalse(
        req,
        res,
        400,
        helper.validationErrorConvertor(validate),
        {}
      );
    }
    let testTypeData = await testType.findOne({
      test_type: reqData.test_type.trim(),
    });
    if (testTypeData) {
      return response.returnFalse(
        req,
        res,
        400,
        "Already Exit",
        {}
      );
    }
    let typeInfo = new testType(reqData);
    let data = await typeInfo.save();
    if (data) {
      return response.returnTrue(req, res,200, "successfully created", data);
    } else {
      return response.returnFalse(req, res,200,"record not found", {});
    }
  } catch (error) {
    console.log(error);
    return response.returnFalse(req, res,500, "internal server error", {});
  }
};

//-------------------get all test type-----------------------

exports.listTestType = async (req, res) => {
  try {
    let data = await testType.find();
    if (data) {
      return response.returnTrue(req, res,200, "fetch successfully", data);
    } else {
      return response.returnFalse(req, res,404,"no record found", {});
    }
  } catch (error) {
    console.log(error);
    return response.returnFalse(req, res,500, "internal server error", {});
  }
};
