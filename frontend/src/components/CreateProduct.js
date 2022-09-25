import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const [error, setError] = useState({ productName: "" });
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isEmpty = Object.keys(error).length === 0;
    console.log(isEmpty);
    if (isEmpty) {
      setIsSubmit(true);
      console.log("Coming in if", isEmpty, isSubmit);
    } else {
      setIsSubmit(false);
      console.log("Coming in else", isEmpty, isSubmit);
    }
  }, [error]);

  const checkForValidations = () => {
    const errors = {};
    if (!productName) {
      errors.productName = "Product Name is Required";
    }
    if (!description) {
      errors.description = "Product Description is Required";
    }
    if (!image) {
      errors.image = "image URL is Required";
    }
    if (!price) {
      errors.price = "Price is Required";
    }
    return errors;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setError(checkForValidations());

    const objectOfForm = {
      name: productName,
      description: description,
      image: image,
      price: price,
     
    };
    checkForValidations();


    if (isSubmit) {
    axios.post("http://localhost:4000/api/v1/products/new",objectOfForm).then((res)=>{
        console.log("This is responce",res)
    }).catch((err)=>{
        console.log("This is error",err)
    })
      navigate("/", { replace: true });
    }
  };

  return (
    <React.Fragment>
      <h2>Create Product</h2>
      <div className="container center_div">
        <Form onSubmit={formSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ProductName"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            <Form.Text className="text-muted"></Form.Text>
            <span style={{ color: "red" }}>{error.productName}</span>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enter Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <span style={{ color: "red" }}>{error.description}</span>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enter Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
            <span style={{ color: "red" }}>{error.image}</span>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enter Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            <span style={{ color: "red" }}>{error.price}</span>
          </Form.Group>

          <Button name="Submit" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
}
