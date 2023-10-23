import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../Popup/DeleteConfirmationModal";
import Spinner from "react-bootstrap/Spinner";
import { Table, Button } from "react-bootstrap";

import { deleteTest, getAllTest } from "../../utils/functions/Test";

import { FetchAllTest } from "../../utils/hooks/FetchAllTest";

import { helper } from "../../utils/helper";
import { Pen } from "react-bootstrap-icons";
import { Trash3 } from "react-bootstrap-icons";

function TableComponent() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tesToDelete, setTestToDelete] = useState(false);

  const { testData, setTestData, error, setError, isLoading, setIsLoading } =
  FetchAllTest();

  const handleDelete = (id) => {
    setTestToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (tesToDelete) {
      await deleteTest(tesToDelete, setError);
      const updatedTest = await getAllTest(setError, setIsLoading);
      setTestData(updatedTest?.data);
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setTestToDelete(null);
    setShowDeleteModal(false);
  };
const thead_bgcolor = "#000000";
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      {error ? (
        <h1>{error}</h1>
      ) : isLoading ? (
        <div className="content-center">
          <Spinner animation="border" size="lg" />
        </div>
      ) : testData.length > 0 ? (
        <div className="table-responsive">
          <Table>
            <thead className="thead-dark">
              <tr>
               
                <th className="text-white" style={{background:`${thead_bgcolor}`}}>Name</th>
                <th className="text-white" style={{background:`${thead_bgcolor}`}}>Email</th>
                <th className="text-white" style={{background:`${thead_bgcolor}`}}>M0bile.</th>
                <th className="text-white" style={{background:`${thead_bgcolor}`}}>Alternate Mo.</th>
                <th className="text-white" style={{background:`${thead_bgcolor}`}}>Type</th>
                <th className="text-white" style={{background:`${thead_bgcolor}`}}>Created</th>
                <th className="text-white" style={{background:`${thead_bgcolor}`}}>Updated</th>
                <th className="text-white" style={{background:`${thead_bgcolor}`}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testData &&
                testData.map((item, index) => (
                  <tr key={item._id}>
                   
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.test_type?.test_type
                        )}`,
                      }}
                    >
                      {item.test_name}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.test_type?.test_type
                        )}`,
                      }}
                    >
                      {item.tester_email}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.test_type?.test_type
                        )}`,
                      }}
                    >
                      {item.tester_mobile_no}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.test_type?.test_type
                        )}`,
                      }}
                    >
                      {item.tester_alternative_no}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.test_type?.test_type
                        )}`,
                      }}
                    >
                      {item?.test_type?.test_type}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.test_type?.test_type
                        )}`,
                      }}
                    >
                      {helper.formateDate(item.createdAt)}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.test_type?.test_type
                        )}`,
                      }}
                    >
                      {item.updatedAt
                        ? helper.formateDate(item.updatedAt)
                        : "-"}
                    </td>

                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.test_type?.test_type
                        )}`,
                      }}
                    >
                      <Link  to={`/create-test/${item._id}`}>
                     <Pen color="#00d4ff" />
                    
                      </Link>
                
                      <span style={{marginLeft:"8px"}}  onClick={() => handleDelete(item._id)}><Trash3 color="red" /></span>
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="content-center">
          <h1>No Record found</h1>
        </div>
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}
    </div>
  );
}

export default TableComponent;
