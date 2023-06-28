import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Button } from "react-bootstrap";

const ChangeItem = ({ itemId }) => {
  const [wantedItemImages, setWantedItemImages] = useState([]);
  const [myItemImages, setMyItemImages] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [receiverId, setReceiverId] = useState(null);
  const [myItemId, setMyItemId] = useState("");
  const [isSliderEnabled, setIsSliderEnabled] = useState(true);
  const [isButtonClickable, setIsButtonClickable] = useState(false);
  const [itemName, setItemName] = useState("");
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const wantedItemResponse = await axios.get(
          // `https://orca-app-ik7qo.ondigitalocean.app/api/items/${itemId}/user`
          `https://orca-app-ik7qo.ondigitalocean.app/api/user/${itemId}`
        );
        const wantedItemData = JSON.parse(wantedItemResponse.data.user.items);
        console.log(wantedItemData);
        const wantedItem = wantedItemData.find(
          (item) => item.id.toString() === itemId.toString()
        );

        if (wantedItem) {
          const formattedImages = JSON.parse(wantedItem.images); // Parse the images array
          // const formattedImages = wantedItemImages.map(
          //   (image) => image.substring(image.indexOf("_") + 1) // Remove everything before the underscore
          // );

          setWantedItemImages(formattedImages);
          console.log("e" + formattedImages);

          setItemDescription(wantedItem.description);
          setItemName(wantedItem.name);
        } else {
          console.error("Error: Wanted item not found.");
        }

        const receiverResponse = await axios.get(
          // `https://orca-app-ik7qo.ondigitalocean.app/api/items/${itemId}/user`
          `https://orca-app-ik7qo.ondigitalocean.app/api/user/${itemId}`
        );
        setReceiverId(receiverResponse.data.user.id);

        const userId = localStorage.getItem("userId");
        const userItemsResponse = await axios.get(
          `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}`
        );
        const userItemsData = userItemsResponse.data.items;

        const userItemImages = userItemsData.map((item) => ({
          id: item.id,
          images: item.images,
        }));

        setMyItemImages(userItemImages);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [itemId]);

  useEffect(() => {
    setIsButtonClickable(!!myItemId);
  }, [myItemId]);

  const handleSwapItemRequest = async () => {
    try {
      const senderId = localStorage.getItem("userId");
      const requestPayload = {
        sender_id: senderId,
        receiver_id: receiverId,
        item_id: itemId,
        my_item_id: myItemId,
      };

      await axios.post(
        "https://orca-app-ik7qo.ondigitalocean.app/api/swap-requests",
        requestPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  const handleMyItemSelection = (id) => {
    setMyItemId(id);
    setIsSliderEnabled(false);
  };

  return (
    <div className="change-item-container">
      <div className="square">
        <h2 className="title">Wanted item</h2>
        <div className="slider-container">
          {wantedItemImages.length > 0 ? (
            <Slider>
              {wantedItemImages.map((image, index) => (
                <div key={index} className="slider-image-container">
                  <img
                    className="slider-image"
                    src={`https://orca-app-ik7qo.ondigitalocean.app/api/images/${image}`}
                    alt={`Item ${index}`}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="infobox" style={{ marginBottom: "10px" }}>
          <p className="name">{itemName}</p>
          <p className="description">{itemDescription}</p>
        </div>
      </div>
      <div className="send-request-container">
        <Button
          className="send-request-button"
          onClick={handleSwapItemRequest}
          disabled={!isButtonClickable}
          style={{ backgroundColor: "black" }}
        >
          Send Swap Request
        </Button>
      </div>
      <div className="square">
        <h2 className="title">My Items</h2>
        <div className="slider-container">
          {myItemImages.length > 0 ? (
            <Slider>
              {myItemImages.map((item, index) => (
                <div key={item.id} className="slider-image-container">
                  {JSON.parse(item.images).map((image, imageIndex) => {
                    // Remove everything before the underscore
                    if (imageIndex === 0) {
                      return (
                        <div key={imageIndex} className="my-item">
                          <img
                            className="slider-image"
                            src={`https://orca-app-ik7qo.ondigitalocean.app/api/images/${image}`}
                            alt={`My Item ${index}`}
                          />

                          {isSliderEnabled && (
                            <button
                              onClick={() => handleMyItemSelection(item.id)}
                              className="select-button"
                            >
                              Select
                            </button>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              ))}
            </Slider>
          ) : (
            <p>No items found.</p>
          )}
        </div>
        <div className="infobox">
          <p className="ItemDescription" style={{ color: "black" }}>
            {itemDescription}
          </p>
          <p style={{ color: "black" }} className="ItemName">
            {itemName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangeItem;
