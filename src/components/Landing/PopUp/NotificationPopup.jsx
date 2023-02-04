import { React } from "react";
import { Card } from "react-bootstrap";
import { Modal, Row } from "react-bootstrap";
import desiImg from "../../../Asserts/Frame 37 (1).png";
import "./NotificationPopup.css";

function NotificationPopup({ show, closePopUp, notifications }) {
  const handleClose = () => {
    closePopUp(false);
  };

  return (
    <>
      <Modal
        className="modal-container"
        show={show}
        onHide={handleClose}
        animation={true}
      >
        <div className="notification-header">
          <Modal.Title className="tittle">NOTIFICATION</Modal.Title>
          <Modal.Header closeButton></Modal.Header>
        </div>
        <Modal.Body className="notification-body">
          <Card className="item-card">
            <Row className="notification-card">
              {notifications?.map((item, index) => (
                <>
                  <div className="item-container">
                    <div className="img-container">
                      <img
                        className="itemImage"
                        src={desiImg}
                        alt="no data"
                        width="80%"
                        height="80%"
                      ></img>
                    </div>
                    <div className="content-container">
                      <small className="notification-tittle">
                        {item.title}
                      </small>
                      <br />
                      <p className="desc">Your order is placed by desi eats</p>
                    </div>
                  </div>
                </>
              ))}
              {notifications?.length === 0 || !notifications ? (
                <p className="no-data">Notifications not found!</p>
              ) : null}
            </Row>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NotificationPopup;
