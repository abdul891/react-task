import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Header from "../Header/Header";

import styles from "./UserForm.module.css";
import { createTestType } from "../../utils/functions/Type";
import { createTest, updateTest } from "../../utils/functions/Test";
import { GetTestType } from "../../utils/hooks/GetTestType";
import { AddTestData } from "../../utils/hooks/AddTestData";

import ErrorPopup from "../Popup/ErrorPopup";
import { Button, Stack } from "react-bootstrap";

function TypeForm() {
  const { testTypeData, setTestTypeData, error, setError } = GetTestType();
  const [testType, setTestType] = useState("");
  const [isTypeCreation, setIsTypeCreation] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const { id, key, userToUpdate, isNotUpdateMode } = AddTestData(setError);

  const initialValues = {
    test_name: userToUpdate ? userToUpdate?.data?.test_name : "",
    tester_email: userToUpdate ? userToUpdate?.data?.tester_email : "",
    test_type: userToUpdate ? userToUpdate?.data?.test_type : "",
    tester_mobile_no: userToUpdate ? userToUpdate?.data?.tester_mobile_no : "",
    tester_alternative_no: userToUpdate
      ? userToUpdate?.data?.tester_alternative_no
      : "",
  };

  const validationSchema = Yup.object({
    test_name: Yup.string()
      .required("Required")
      .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
    tester_email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    tester_mobile_no: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Required"),
    tester_alternative_no: Yup.string()
      .matches(/^\d{10}$/, "Alternative number must be 10 digits")
      .notOneOf(
        [Yup.ref("tester_mobile_no")],
        "Alternative number should not be the same as mobile no"
      )
      .required("Required"),
    test_type: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    if (isNotUpdateMode || id) {
      if (isNotUpdateMode) {
        let res = await createTest(setError, setShowErrorModal, values);
        if (res) {
          navigate("/dashboard");
        }
      } else {
        let res = await updateTest(setError, setShowErrorModal, values, id);
        res && navigate("/dashboard");
      }
    }
  };

  const handleCreateType = async (data) => {
    await createTestType(
      setError,
      setShowErrorModal,
      setTestTypeData,
      setIsTypeCreation,
      data
    );
    setTestType("");
  };

  return (
    <div>
      <Header />
      <div className={`container mt-4 ${styles.user_form_container}`}>
        
        <Formik
          key={key}
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form_container}>
          <h2 className="text-center mb-3"> {isNotUpdateMode ? "Create Test" : "Update Test"}</h2>
            <div className="form-group justify mb-3">
              
              <Field
                type="text"
                id="test_name"
                name="test_name"
                className="form-control"
                placeholder="Enter Your Name"
              />
              <ErrorMessage
                name="test_name"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group mb-3">
              
              <Field
                type="email"
                id="tester_email"
                name="tester_email"
                className="form-control"
                placeholder="Enter Your Name"
                disabled={!isNotUpdateMode}
              />
              <ErrorMessage
                name="tester_email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group mb-3">
             
              <Field
                type="number"
                id="tester_mobile_no"
                name="tester_mobile_no"
                className="form-control"
                placeholder="Enter Your Mobile Number"
              />
              <ErrorMessage
                name="tester_mobile_no"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group mb-3">
              
              <Field
                type="number"
                id="tester_alternative_no"
                name="tester_alternative_no"
                className="form-control"
                placeholder="Enter Your Alternate Number"
              />
              <ErrorMessage
                name="tester_alternative_no"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group mb-3">
              
              <Field as="select" name="test_type" className="form-control">
                <option value="">----Select test type---</option>
                {testTypeData?.length > 0
                  ? testTypeData.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.test_type}
                      </option>
                    ))
                  : null}
              </Field>
              <ErrorMessage
                name="test_type"
                component="div"
                className="text-danger"
              />
            </div>
            {isNotUpdateMode ? (
              <div className="form-group">
                <p
                  className={styles.type_heading}
                  onClick={() => setIsTypeCreation(true)}
                >
                  create test type:
                </p>
                {isTypeCreation && (
                  <div className={styles.type_section}>
                    <Field
                      type="text"
                      className="form-control"
                      value={testType}
                      onChange={(e) => setTestType(e.target.value)}
                    />

                    <Stack direction="horizontal">
                      <p
                        className={styles.type_section_button}
                        onClick={() =>
                          handleCreateType({ test_type: testType })
                        }
                      >
                        Create
                      </p>
                      <div className="vr" />
                      <p
                        className={styles.type_section_button}
                        onClick={() => setIsTypeCreation(false)}
                      >
                        close
                      </p>
                    </Stack>
                  </div>
                )}
              </div>
            ) : null}

            
              <Button type="submit" variant="secondary">
                {isNotUpdateMode ? "Create Test" : "Update Test"}
              </Button>
             
              
            
          </Form>
        </Formik>
      </div>
      <ErrorPopup
        showErrorModal={showErrorModal}
        setShowErrorModal={setShowErrorModal}
        ErrorTitle={"Error"}
        ErrorMessage={error}
      />
    </div>
  );
}

export default TypeForm;
