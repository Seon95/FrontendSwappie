import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Button } from "react-bootstrap";

const Notifications2 = ({ userId, token }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data.notifications || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [userId, token]);

  const handleAccept = (notificationId) => {
    // Handle accept logic
    console.log("Accepted notification with ID:", notificationId);
  };

  const handleReject = (notificationId) => {
    // Handle reject logic
    console.log("Rejected notification with ID:", notificationId);
  };

  if (isLoading) {
    return <Spinner animation="border" role="status" />;
  }

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((notification, index) => (
          <div key={index} className="mb-3 p-3 border">
            <p>{notification}</p>
            <Button
              variant="success"
              onClick={() => handleAccept(notification)}
            >
              Accept
            </Button>{" "}
            <Button variant="danger" onClick={() => handleReject(notification)}>
              Reject
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications2;
