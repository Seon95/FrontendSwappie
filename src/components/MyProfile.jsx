import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, Modal } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import Dropzone from "dropzone";
import { useDropzone } from "react-dropzone";

const MyProfile = ({ userId }) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://orca-app-ik7qo.ondigitalocean.app/api/categories"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [editItemData, setEditItemData] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    quantity: 0,
  });

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    multiple: true,
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setSelectedImages(acceptedFiles);
    },
  });

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(response.data.items);
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
      // Validate image selection
      if (selectedImages.length === 0) {
        // Display an error message or perform appropriate action
        console.error("Please select at least one image.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category_id", category);
      formData.append("quantity", quantity);

      selectedImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      await axios.post(
        `https://orca-app-ik7qo.ondigitalocean.app/api/items/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const response = await axios.get(
        `https://orca-app-ik7qo.ondigitalocean.app/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(response.data.items);
      setName("");
      setDescription("");
      setCategory("");
      setSelectedImage(null);
      setQuantity(0);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://orca-app-ik7qo.ondigitalocean.app/api/items/${userId}/${itemId}`,
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
    setSelectedImages(item.images);
    setShowEditModal(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setName("");
    setDescription("");
    setCategory("");
    setSelectedImages([]);
    setQuantity(0);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditItemData({
      id: "",
      name: "",
      description: "",
      category: "",
      quantity: 0,
    });
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://orca-app-ik7qo.ondigitalocean.app/api/items/${userId}/${editItemData.id}`,
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
      setShowEditModal(false);
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
    <Container style={{ maxWidth: "1000px" }}>
      <h2 className="titleMyProfile">Item Details</h2>

      {items && items.length > 0 && (
        <div>
          {items.map((item) => {
            const imgSrc = JSON.parse(item.images);
            const firstImage = imgSrc.length > 0 ? imgSrc[0] : null;

            return (
              <Card
                key={item.id}
                className="mb-3 cardStyle"
                style={{
                  background: "transparent",
                  borderColor: "black",
                }}
              >
                <Card.Body
                  className="item-details"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                  }}
                >
                  <div className="item-details-image">
                    {firstImage && (
                      <Card.Img
                        src={`https://orca-app-ik7qo.ondigitalocean.app/api/images/${firstImage}`}
                        alt={`Image 1`}
                        className="img-fluid"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </div>
                  <div className="item-details-content">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </div>
                  <div className="item-details-actions">
                    <Button
                      variant="danger"
                      className="mr-2"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleEditItem(item)}
                      style={{ backgroundColor: "black", borderColor: "black" }}
                    >
                      <FaEdit />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}

      <div>
        <h2 className="AddItemTitle">Add New Item </h2>
        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          style={{ backgroundColor: "black" }}
        >
          Add Item
        </Button>
      </div>

      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
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
              <Form.Label>Image Upload (Select or drop your images)</Form.Label>

              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button onClick={open}>Select File</Button>
              </div>
              <aside>
                <ul>
                  {acceptedFiles.map((file, index) => (
                    <li key={index} className="dz-preview dz-file-preview">
                      <div className="dz-details">
                        <div className="dz-filename">
                          <span data-dz-name>{file.path}</span>
                        </div>
                        <div className="dz-size" data-dz-size>
                          {file.size} bytes
                        </div>
                        <img
                          data-dz-thumbnail
                          src={file.preview}
                          alt="Preview"
                        />
                      </div>
                      <div className="dz-progress">
                        <span
                          className="dz-upload"
                          style={{ width: `${file.progress}%` }}
                          data-dz-uploadprogress
                        ></span>
                      </div>
                      <div className="dz-success-mark">
                        <span>✔</span>
                      </div>
                      <div className="dz-error-mark">
                        <span>✘</span>
                      </div>
                      <div className="dz-error-message">
                        <span data-dz-errormessage></span>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            </Form.Group>
            <Button variant="success" type="submit">
              Add Item
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateItem}>
            <Form.Group controlId="editName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editItemData.name}
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
                value={editItemData.description}
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
                value={editItemData.category}
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
                value={editItemData.quantity}
                onChange={(e) =>
                  setEditItemData({
                    ...editItemData,
                    quantity: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Update Item
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyProfile;
