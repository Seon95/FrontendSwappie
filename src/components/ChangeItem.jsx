import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const ChangeItem = ({ itemId }) => {
  const [wantedItemImages, setWantedItemImages] = useState([]);
  const [myItemImages, setMyItemImages] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [receiverId, setReceiverId] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const wantedItemResponse = await axios.get(
          `https://orca-app-ik7qo.ondigitalocean.app/api/items/${itemId}/user`
        );
        const wantedItemData = JSON.parse(wantedItemResponse.data.user.items);
        const wantedItemImages = wantedItemData
          .map((item) => item.images)
          .flat();
        setWantedItemImages(wantedItemImages);
        setItemDescription(wantedItemData[0].description);

        const receiverResponse = await axios.get(
          `https://orca-app-ik7qo.ondigitalocean.app/api/items/${itemId}/user`
        );
        setReceiverId(receiverResponse.data.user.id);

        const userId = localStorage.getItem("userId");
        const userItemsResponse = await axios.get(
          `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}`
        );
        const userItemsData = userItemsResponse.data.items;
        const userItemImages = userItemsData.map((item) => item.images).flat();
        setMyItemImages(userItemImages);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [itemId]);

  const handleSwapItemRequest = async () => {
    try {
      const senderId = localStorage.getItem("userId");
      const requestPayload = {
        sender_id: senderId,
        receiver_id: receiverId,
        item_id: itemId,
      };

      await axios.post(
        "https://orca-app-ik7qo.ondigitalocean.app/api/swap-requests",
        requestPayload
      );
      alert("Swap item request sent successfully!");
    } catch (error) {
      console.error("Error sending swap item request:", error);
      alert("Error sending swap item request. Please try again.");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="change-item-container">
      <div className="square">
        <h2 className="title">Wanted item</h2>
        <div className="slider-container">
          {wantedItemImages.length > 0 ? (
            <Slider {...sliderSettings}>
              {wantedItemImages.map((image, index) => (
                <div key={index} className="slider-image-container">
                  <img
                    className="slider-image"
                    src={"/" + image}
                    alt={`Item ${index}`}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <p className="description">{itemDescription}</p>
        <button onClick={handleSwapItemRequest}>Send Swap Request</button>
      </div>
      <div className="square">
        <h2 className="title">My Items</h2>
        <div className="slider-container">
          {myItemImages.length > 0 ? (
            <Slider {...sliderSettings}>
              {myItemImages.map((image, index) => (
                <div key={index} className="slider-image-container">
                  <img
                    className="slider-image"
                    src={"/" + image}
                    alt={`My Item ${index}`}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeItem;
