import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Image, Modal, Button } from "react-bootstrap";

const Notifications = () => {
  const [swapRequests, setSwapRequests] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchSwapRequests = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}/swap-requests`
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
              `https://orca-app-ik7qo.ondigitalocean.app/api/items/${request.item_id}/user`
            );
            const userData = response.data.user;
            const itemsData = JSON.parse(userData.items);
            const item = itemsData.find((item) => item.id === request.item_id);
            const itemName = item.name;
            const reqId = request.id;

            const myItemResponse = await axios.get(
              `https://orca-app-ik7qo.ondigitalocean.app/api/items/${request.my_item_id}/user`
            );
            const myItemUserData = myItemResponse.data.user;
            const myItemItemsData = JSON.parse(myItemUserData.items);
            const myItem = myItemItemsData.find(
              (item) => item.id === request.my_item_id
            );
            const myItemName = myItem.name;

            const itemImage = item.images[0];
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
        `https://orca-app-ik7qo.ondigitalocean.app/api/swap-requests/${item.reqId}`
      );
    } catch (error) {
      console.error("Error deleting swap request:", error);
    }
  };

  return (
    <div>
      <h2>Swap Item Requests</h2>
      {swapRequests.length > 0 ? (
        <ListGroup>
          {itemData.map((item) => (
            <ListGroup.Item key={item.senderName}>
              <u>{item.senderName}</u> wants to change his{" "}
              <u>{item.itemName}</u> item for your item <u>{item.myItemName}</u>{" "}
              <Image
                src={item.itemImage}
                alt="Item"
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                onClick={() => handleImageClick(item)}
              />
              <Button
                variant="success"
                className="mr-2"
                onClick={() => handleAcceptRequest(item)}
              >
                Accept
              </Button>
              <Button
                variant="danger"
                onClick={() => handleRejectRequest(item)}
              >
                Reject
              </Button>
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
                src={selectedItem.itemImage}
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
    </div>
  );
};

export default Notifications;
