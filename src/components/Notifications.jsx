import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Image, Modal, Button, Container } from "react-bootstrap";

const Notifications = () => {
  const [swapRequests, setSwapRequests] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  useEffect(() => {
    const fetchSwapRequests = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          // `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}/swap-requests`
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
              // `https://orca-app-ik7qo.ondigitalocean.app/api/items/${request.item_id}/user`
              `https://orca-app-ik7qo.ondigitalocean.app/api/user/${request.item_id}`
            );
            const userData = response.data.user;
            console.log(userData + "jj");
            const itemsData = JSON.parse(userData.items);
            const item = itemsData.find((item) => item.id === request.item_id);
            const itemName = item.name;
            const reqId = request.id;

            const myItemResponse = await axios.get(
              // `https://orca-app-ik7qo.ondigitalocean.app/api/items/${request.my_item_id}/user`
              `https://orca-app-ik7qo.ondigitalocean.app/api/user/${request.my_item_id}`
            );
            const myItemUserData = myItemResponse.data.user;
            const myItemsData = JSON.parse(myItemUserData.items);
            const myItem = myItemsData.find(
              (item) => item.id === request.my_item_id
            );
            const myItemName = myItem.name;

            // Parse the images JSON string into an array
            const itemImages = JSON.parse(item.images);
            const itemImage = itemImages[0];

            return {
              senderName: userData.username,
              itemName,
              itemDescription: item.description,
              itemImage,
              myItemName,
              reqId,
            };
          } catch (error) {
            console.error("Error fetching item data:", error);

            return {
              senderName: "",
              itemName: "",
              itemDescription: "",
              itemImage: "",
              myItemName: "",
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
    console.log("Accepting swap request:", item);
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

      // Remove the rejected swap request from the swapRequests state
      setSwapRequests((prevSwapRequests) =>
        prevSwapRequests.filter((request) => request.id !== item.reqId)
      );
    } catch (error) {
      console.error("Error deleting swap request:", error);
    }
  };

  return (
    <Container style={{ maxWidth: "1000px" }}>
      <h2 style={{ padding: "30px 0px" }}>Swap Item Requests</h2>
      {swapRequests.length > 0 ? (
        <ListGroup>
          {itemData.map((item) => (
            <ListGroup.Item
              key={item.senderName}
              style={{
                fontSize: "18px",
                borderRadius: "10px",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto", // Image - Text - Buttons
                alignItems: "center", // Center items vertically
                gap: "20px",
                marginBottom: "20px",
                backgroundColor: "transparent",
                borderColor: "black",
              }}
            >
              <div>
                <u>{item.senderName}</u> wants to change his{" "}
                <u>{item.itemName}</u> item for your item{" "}
                <u>{item.myItemName}</u>
              </div>
              <div>
                <Image
                  src={item.itemImage.substring(
                    item.itemImage.lastIndexOf("_") + 1
                  )}
                  alt="Item"
                  style={{
                    width: "100px",
                    height: "100px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(item)}
                />
              </div>
              <div style={{ justifySelf: "end" }}>
                <Button
                  variant="success"
                  className="mr-2"
                  onClick={() => handleAcceptRequest(item)}
                  style={{ backgroundColor: "black" }}
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
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No swap item requests found.</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem && selectedItem.itemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <Image
                src={selectedItem.itemImage.substring(
                  selectedItem.itemImage.lastIndexOf("_") + 1
                )}
                alt="Selected Item"
                style={{ width: "100%" }}
              />
              <p>{selectedItem.itemDescription}</p>
              <Button
                variant="success"
                className="mr-2"
                onClick={() => handleAcceptRequest(selectedItem)}
              >
                Accept
              </Button>
              <Button
                variant="danger"
                onClick={() => handleRejectRequest(selectedItem)}
              >
                Reject
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Notifications;
