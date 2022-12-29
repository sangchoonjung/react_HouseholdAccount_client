import { useEffect, useRef } from "react";
import Write from "./write";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import HistoryBar from "./histirybar";

const Sub = ({ datas, setDeletedItem }) => {
  return datas.map((data) => {
    return (
      <tr key={data._id}>
        <td>
          {
            <input
              type="checkbox"
              onClick={() => {
                setDeletedItem((c) => {
                  return c.includes(data._id)
                    ? c.filter((one) => one !== data._id)
                    : [...c, data._id];
                });
              }}
            />
          }
        </td>
        <td>{data.itemDate}</td>
        <td>{data.useDesc}</td>
        <td>{data.cashAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>{data.cardAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>{data.category}</td>
        <td>{data.tag}</td>
      </tr>
    );
  });
};

function History({ historyAPI, data }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [list, setList] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [graph, setGraph] = useState(true);
  const monthRef = useRef();
  const [deletedItem, setDeletedItem] = useState([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    monthRef.current.value = month;
    historyAPI.history(month).then((received) => {
      if (received.result) {
        setList(received.datas);
      } else {
        navigate("/");
      }
    });
  }, [month, num, show]);

  const deleteHandle = async (deletedItem) => {
    const response = await fetch(
      "http://192.168.4.127:8080/api/history/delete",
      {
        method: "POST",
        body: JSON.stringify({
          data: deletedItem,
        }),
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data, "리턴");
    setNum((c) => c + 1);
  };

  return (
    <div className="row">
      {/* 배너 */}
      <div className="col-3">
        <Card style={{ maxWidth: "18rem" }}>
          <Card.Img
            variant="top"
            src="/react_HouseholdAccount_client/logo192.png"
            width={"100%"}
            height={"100%"}
          />
          <Card.Body className="text-center">
            <Card.Title>가계부 만들기</Card.Title>
            <Card.Text>👇모달👇</Card.Text>
            <Button variant="primary" onClick={handleShow}>
              글쓰기
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>글쓰기 모달창</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Write historyAPI={historyAPI} />
              </Modal.Body>
            </Modal>
          </Card.Body>
        </Card>
      </div>

      <div className="col-7 ml-3 mt-3">
        <div className="form-floating">
          <input
            type="month"
            className="form-control"
            id="itemDate"
            ref={monthRef}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          />
          <label htmlFor="itemDate">소비</label>
        </div>

        <div className="form-check form-switch mt-3 ">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={(e) => {
              if (graph) {
                setGraph(false);
              } else {
                setGraph(true);
              }
            }}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Graph off
          </label>
        </div>

        {graph && <HistoryBar datas={list} />}
        <Button onClick={() => deleteHandle(deletedItem)}>삭제</Button>
        <div style={{ textAlign: "center" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <td>{<input type="checkbox" />}</td>
                <td>일자</td>
                <td>사용내역</td>
                <td>현금</td>
                <td>카드</td>
                <td>카테고리</td>
                <td>태그</td>
              </tr>
            </thead>
            <tbody>
              <Sub datas={list} setDeletedItem={setDeletedItem} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
