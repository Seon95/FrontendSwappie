import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ChangeItem = ({ items }) => {
  const itemImages = [
    "/src/assets/image1.jpg",
    "/src/assets/image2.jpg",
    "/src/assets/image3.jpg",
    // ... add more image paths here
  ];
  console.log("change" + items);
  const CustomPrevArrow = (props) => (
    <button
      className="custom-arrow custom-prev-arrow"
      onClick={props.onClick}
      style={{ color: "blue" }}
    >
      &lt;
    </button>
  );

  const CustomNextArrow = (props) => (
    <button
      className="custom-arrow custom-next-arrow"
      onClick={props.onClick}
      style={{ color: "blue" }}
    >
      &gt;
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="change-item-container">
      <div className="square">
        <h2 className="title">Wanted item</h2>
        <div className="slider-container">
          <img
            className="image"
            src="/src/assets/image1.jpg"
            alt="Wanted item"
          />
        </div>
        <p className="description">Description of the wanted item goes here.</p>
      </div>
      <div className="send-request-container">
        <button className="send-request-button">Send Request</button>
      </div>
      <div className="square">
        <h2 className="title">My Items</h2>
        <div className="slider-container">
          <Slider {...sliderSettings}>
            {itemImages.map((image, index) => (
              <div key={index} className="slider-image-container">
                <img
                  className="slider-image"
                  src={image}
                  alt={`Item ${index}`}
                />
              </div>
            ))}
          </Slider>
        </div>
        <p className="description">
          Description of the another item goes here.
        </p>
      </div>
    </div>
  );
};

export default ChangeItem;
