const { Validator } = require("node-input-validator");
const response = require("../config/response");
const users = require("../model/users");

//-----------------Create Test-------------------------

exports.createTest = async (req, res) => {
  const reqData = req.body;
  console.log(reqData);
  try {
    //Validate the request body data
    let validation = new Validator(reqData, {
      test_name: "required",
      tester_mobile_no: "required",
      tester_alternative_no: "required",
      tester_email: "required|email",
      test_type: "required",
    });
    let matched = await validation.check();
    if (!matched) {
      return response.returnFalse(
        req,
        res,
        400,
        helper.validationErrorConvertor(validation),
        {}
      );
    }

    //Check if email is already exists or not
    const userData = await users.findOne({ tester_email: reqData.tester_email });
    if (userData) {
      return response.returnFalse(req, res, 400, "Email Already Exit", {});
    }

    const userInfo = new users(reqData);
    const savedUser = await userInfo.save();
    if (savedUser) {
      return response.returnTrue(
        req,
        res,
        200,
        "Created Successfully",
        savedUser
      );
    } else {
      return response.returnFalse(req, res, 500, "Try Again latter", {});
    }
  } catch (error) {
  console.log(error);
    return response.returnFalse(req, res,500, "Internal server error", {});
  }
};

//------------------get all test------------------------

exports.getAllTest = async (req, res) => {
  
  try {
     const testData = await users.find().populate('test_type');
  
    if (testData.length > 0) {
      return response.returnTrue(req, res,200, 'Fetch all test', testData);
    } else {
      return response.returnFalse(req, res,404, "No record Found", {});
    }
  } catch (error) {
  
    return response.returnFalse(req, res,500, "Internal server error", {});
  }
};

//--------------------single test----------------------

exports.getTest = async (req, res) => {
  
  
  try {
    const testData = await users.findById(req.params.id);
    if (testData) {
      return response.returnTrue(req, res, 200, "Fetch successfully", testData);
    } else {
      return response.returnTrue(req, res, 404, "No record found", {});
    }
  } catch (error) {
    
    return response.returnFalse(req, res,500, "Internal server error", {});
  }
};

//--------------------update single test----------------------

exports.updateTest = async (req, res) => {
  try {
    let id = req.params.id
    req.body.updatedAt = Date.now()
    await users.updateOne({ _id: id }, { $set: req.body });
    return response.returnTrue(req, res,200, "successfully updated", {});
  } catch (error) {
   
    return response.returnFalse(req, res,200, "internal server error", {});
  }
};

//----------------------delete single test--------------------

exports.deleteTest = async (req, res) => {
  try {
    await users.findByIdAndDelete(req.params.id);
    return response.returnTrue(req, res,200, "Delete successfully");
  } catch (error) {
   
    return response.returnFalse(req, res,500, "Internal server error", {});
  }
};
