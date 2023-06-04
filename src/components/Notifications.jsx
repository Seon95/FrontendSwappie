import React from "react";
import ItemsApi from "../store/ItemsApi";

const Notifications = () => {
  const { data, isLoading } = ItemsApi.useGetAllItemsQuery();

  return <div>Notif</div>;
};

export default Notifications;
