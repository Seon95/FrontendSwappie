import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Dropzone from "dropzone";
const MyProfile = ({ userId, token }) => {
  console.log(userId + "nene");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editItemData, setEditItemData] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    quantity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}`
        );
        setItems(response.data.items);
        console.log(token);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category_id", category);
      formData.append("quantity", quantity);
      if (selectedImage) {
        formData.append("images[]", selectedImage);
      }

      await axios.post(
        `https://orca-app-ik7qo.ondigitalocean.app/api/users/items/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const response = await axios.get(
        `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}`
      );
      setItems(response.data.items);

      setName("");
      setDescription("");
      setCategory("");
      setSelectedImage(null);
      setQuantity(0);
      console.log(token);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(
        `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}/items/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditItem = (item) => {
    setEditItemData({
      id: item.id,

      name: item.name,
      description: item.description,
      category: item.category_id,
      quantity: item.quantity,
    });
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditItemData({
      id: "",
      name: "",
      description: "",
      category: "",
      quantity: 0,
    });
  };

  const handleUpdateItem = async () => {
    try {
      await axios.put(
        `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}/items/${editItemData.id}`,
        {
          name: editItemData.name,
          description: editItemData.description,
          category_id: editItemData.category,
          quantity: editItemData.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = await axios.get(
        `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}`
      );
      setItems(response.data.items);
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setShowModal(false);
      setEditItemData({
        id: "",
        name: "",
        description: "",
        category: "",
        quantity: 0,
      });
    }
  };

  return (
    <Container>
      {items.length > 0 && (
        <div>
          <h2>Item Details</h2>
          {items.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>{item.category}</Card.Text>
                {item.images?.length > 0 && (
                  <Card.Img
                    src={item.images[0]}
                    alt={`Image 1`}
                    className="img-fluid"
                    style={{ width: "70px", height: "70px" }}
                  />
                )}
                <Button
                  variant="danger"
                  className="mr-2"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </Button>
                <Button variant="primary" onClick={() => handleEditItem(item)}>
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      <div>
        <h2>Add New Item</h2>
        <Form onSubmit={handleAddItem}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image Upload</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Add Item
          </Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editItemData.name || ""}
                onChange={(e) =>
                  setEditItemData({
                    ...editItemData,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editItemData.description || ""}
                onChange={(e) =>
                  setEditItemData({
                    ...editItemData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={editItemData.category || ""}
                onChange={(e) =>
                  setEditItemData({
                    ...editItemData,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={editItemData.quantity || 0}
                onChange={(e) =>
                  setEditItemData({
                    ...editItemData,
                    quantity: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateItem}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyProfile;
