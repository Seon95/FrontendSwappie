import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Image } from "react-bootstrap";

const Notifications = () => {
  const [swapRequests, setSwapRequests] = useState([]);
  const [itemData, setItemData] = useState([]);

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
      const promises = swapRequests.map(async (request) => {
        try {
          const response = await axios.get(
            `https://orca-app-ik7qo.ondigitalocean.app/api/items/${request.item_id}/user`
          );
          const userData = response.data.user;
          const itemsData = JSON.parse(userData.items);
          const item = itemsData.find((item) => item.id === request.item_id);
          const itemName = item.name;
          const itemImage = item.images[0];
          return { senderName: userData.username, itemName, itemImage };
        } catch (error) {
          console.error("Error fetching item data:", error);
          return { senderName: "", itemName: "", itemImage: "" };
        }
      });

      try {
        const resolvedItems = await Promise.all(promises);
        setItemData(resolvedItems);
      } catch (error) {
        console.error("Error resolving item data promises:", error);
      }
    };

    if (swapRequests.length > 0) {
      fetchItemData();
    }
  }, [swapRequests]);

  return (
    <div>
      <h2>Swap Item Requests</h2>
      {swapRequests.length > 0 ? (
        <ListGroup>
          {itemData.map((item) => (
            <ListGroup.Item key={item.senderName}>
              {item.senderName} wants to change his {item.itemName} item for
              your
              <Image
                src={item.itemImage}
                alt="Item"
                style={{ width: "50px", height: "50px" }}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No swap item requests found.</p>
      )}
    </div>
  );
};

export default Notifications;
