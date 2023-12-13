import React, { useEffect, useState } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import { RecordList } from "./RecordList";
import { NewButton } from "./NewButton";
import { DeletionAlert } from "./DeletionAlert";
import { SearchRecord } from "./SearchRecord";

function Dashboard() {
  const { currentUser } = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const dataref = ref(database, "users/" + currentUser?.uid + "/records");

  const navigate = useNavigate();

  function handleAddNewRecord() {
    navigate("/new-record");
  }

  function getFilteredData(filteredData) {
    setFilteredData(filteredData);
  }

  useEffect(() => {
    const unsubscribe = onValue(
      dataref,
      (snapshot) => {
        if (snapshot.exists()) {
          const retrievedData = snapshot.val();
          if (retrievedData) {
            const dataArray = Object.entries(retrievedData).map(
              ([key, value]) => ({ key, ...value })
            );

            dataArray.sort((a, b) => {
              const recordNameA = a.recordName || "";
              const recordNameB = b.recordName || "";
              return recordNameA.localeCompare(recordNameB);
            });
            setData(dataArray);
            setFilteredData(dataArray);
          }
          setError(null);
        }
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unsubscribe();
  }, [message]);

  return (
    <Container>
      <DeletionAlert />
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col className="mb-3" md={2}>
          <div className="d-flex justify-content-between">
            <div>
              <NewButton handleAddNewRecord={handleAddNewRecord} />
            </div>
            {/* <SearchRecord records={data} getFilteredData={getFilteredData} /> */}
          </div>
        </Col>
        <Col md={10}>
          <RecordList
            recordsList={filteredData}
            getFilteredData={getFilteredData}
            records={data}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
