import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ListGroup,
  Image,
  Modal,
  Button,
  Container,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Notifications = () => {
  const [swapRequests, setSwapRequests] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSwapRequests = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `https://orca-app-ik7qo.ondigitalocean.app/api/swap-requests/${userId}`
        );
        const swapRequestsData = response.data;
        setSwapRequests(swapRequestsData);
      } catch (error) {
        console.error("Error fetching swap requests:", error);
      }
    };

    fetchSwapRequests();
  }, []);

  useEffect(() => {
    const fetchItemData = async () => {
      const resolvedItems = await Promise.all(
        swapRequests.map(async (request) => {
          try {
            const response = await axios.get(
              `https://orca-app-ik7qo.ondigitalocean.app/api/user/${request.item_id}`
            );
            const userData = response.data.user;
            const itemsData = JSON.parse(userData.items);
            const item = itemsData.find((item) => item.id === request.item_id);
            const itemName = item.name;
            const reqId = request.id;

            const myItemResponse = await axios.get(
              `https://orca-app-ik7qo.ondigitalocean.app/api/user/${request.my_item_id}`
            );
            const myItemUserData = myItemResponse.data.user;
            const myItemUser = myItemUserData.username;

            const myItemsData = JSON.parse(myItemUserData.items);
            const myItem = myItemsData.find(
              (item) => item.id === request.my_item_id
            );
            const myItemName = myItem.name;
            const myItemId = myItem.id;
            const myItemDescription = myItem.description;
            const myItemImages = JSON.parse(myItem.images);
            const myItemImage =
              myItemImages.length > 0 ? myItemImages[0] : null;
            const itemImages = JSON.parse(item.images);
            const itemImage = itemImages[0];

            return {
              senderName: userData.username,
              itemName,
              itemDescription: item.description,
              myItemImage,
              itemImage,
              myItemName,
              reqId,
              myItemUser,
              myItemDescription,
            };
          } catch (error) {
            console.error("Error fetching item data:", error);

            return {
              senderName: "",
              itemName: "",
              itemDescription: "",
              itemImage: "",
              myItemName: "",
              myItemImage: "",
              myItemUser: "",
            };
          }
        })
      );
      setItemData(resolvedItems);
    };

    if (swapRequests.length > 0) {
      fetchItemData();
    }
  }, [swapRequests]);

  const handleImageClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAcceptRequest = (item) => {
    //
  };

  const handleRejectRequest = async (item) => {
    try {
      await axios.delete(
        `https://orca-app-ik7qo.ondigitalocean.app/api/swap-requests/${item.reqId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSwapRequests((prevSwapRequests) =>
        prevSwapRequests.filter((request) => request.id !== item.reqId)
      );
    } catch (error) {
      console.error("Error deleting swap request:", error);
    }
  };

  return (
    <Container style={{ maxWidth: "1200px" }}>
      <h2 style={{ padding: "30px 0px" }}>Swap Item Requests</h2>
      {swapRequests.length > 0 ? (
        <ListGroup>
          {itemData.map((item) => (
            <ListGroup.Item
              key={item.senderName}
              style={{
                fontSize: "18px",
                borderRadius: "10px",
                marginBottom: "20px",
                backgroundColor: "transparent",
                border: "1px solid",
                borderColor: "black",
                fontWeight: "600",
              }}
            >
              <div className="d-flex flex-wrap align-items-center">
                <div className="mr-3">
                  <b style={{ fontWeight: "700" }}>{item.myItemUser}</b> wants
                  to change his{" "}
                  <b style={{ fontWeight: "700" }}> {item.myItemName} </b>
                  <Image
                    src={`https://orca-app-ik7qo.ondigitalocean.app/api/images/${item.myItemImage}`}
                    alt="Item"
                    style={{
                      width: "100px",
                      height: "100px",
                      cursor: "pointer",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                    onClick={() => handleImageClick(item)}
                  />{" "}
                  item for your item{" "}
                  <b style={{ fontWeight: "700" }}>{item.itemName}</b>
                  <Image
                    src={`https://orca-app-ik7qo.ondigitalocean.app/api/images/${item.itemImage}`}
                    alt="Item"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginLeft: "15px",
                    }}
                  />
                </div>
                <div className="mt-3 mt-md-0 ml-md-auto">
                  <Button
                    variant="success"
                    className="mr-2"
                    onClick={() => handleAcceptRequest(item)}
                    style={{ backgroundColor: "black", borderColor: "black" }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleRejectRequest(item)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No swap item requests found.</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body
          closeButton
          style={{
            backgroundColor: "lightgrey",
            border: "2px solid white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleCloseModal}
            style={{ color: "red" }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="d-flex justify-content-center w-100">
            <h5 className="text-center">
              {selectedItem && selectedItem.myItemName}
            </h5>
          </div>
          {selectedItem && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Image
                src={`https://orca-app-ik7qo.ondigitalocean.app/api/images/${selectedItem.myItemImage}`}
                alt="Selected Item"
                style={{
                  maxWidth: "300px",
                  maxHeight: "300px",
                  width: "100%",
                  height: "100%",
                  margin: "0 auto",
                }}
              />
              <p style={{ marginTop: "20px", color: "black" }}>
                {selectedItem.myItemDescription}
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Notifications;
