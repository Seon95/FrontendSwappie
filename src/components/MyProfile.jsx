import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import axios from "axios";

const MyProfile = ({ userId, token }) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable

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

    // Ignore if form is already being submitted
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true); // Set submitting flag to true

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category_id", category);
      formData.append("quantity", quantity);
      if (selectedImage) {
        formData.append("image", selectedImage);
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

      // Refresh items
      const response = await axios.get(
        `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}`
      );
      setItems(response.data.items);

      // Clear form fields
      setName("");
      setDescription("");
      setCategory("");
      setSelectedImage(null);
      setQuantity(0);
      console.log(token);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false); // Reset submitting flag to false
    }
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const handleEditItem = (itemId) => {
    // Implement your logic for editing an item here
    console.log("Edit item:", itemId);
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
                <Card.Img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid"
                />
                <Button
                  variant="danger"
                  className="mr-2"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleEditItem(item.id)}
                >
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
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Add Item
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default MyProfile;
