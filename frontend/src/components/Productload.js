import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router';
import {Button} from "react-bootstrap";

export default function Productload() {
  const [productData, setProductData] = useState([]);
  const [disable,setDisable] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();


  const mainContainer = {
    padding: "2px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    clear: "right",
  };

  const Container = {
    flex: "1",
    margin: "5px",
    minWidth: "280px",
    height: "350px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: " #f5fbfd",
    position: " relative",
    flexDirection: "column",
  };

  const imageContainer = {
    display: "flex",
    flexDirection: "vertical",
    width: "auto",
    height: "80%",
  };

  const headerText = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    fontWeight: "500",
    fontSize: "25px",
  };
  const info = {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "space-around",
    width: "100%",
  };
  const text = {
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
  };

  const filterGold = (e) =>{
    console.log(e.target.name)
      disableButton(e)
      const obj = {...productData,[e.target.name]: e.target.value}
      console.log("This is obj",obj)
      axios.post(`http://localhost:4000/api/v1/products/filter/${productData._id}`,obj).then((res)=>{
        setProductData(res.data)
      }).catch((err)=>{
        console.log("This is error",err)
      })
  }

  const disableButton = (e) =>{
    if(e.target.value === "24"){
      setDisable(true)
    }else{
      setDisable(false)
    }
  }

  const getProduct = () => {
    axios
      .get(`http://localhost:4000/api/v1/products/${id}`)
      .then((res) => {
        console.log("This is specifc productData", res.data);
        setProductData(res.data.product);
      })
      .catch((err) => {
        console.log("error happend", err);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <div style={headerText}>Product</div>
      <><Button onClick = {()=>navigate("/", { replace: true })}>GO BACK</Button></>
      <>
        <div style={mainContainer}>
          <div key={productData._id} style={Container}>
            <img src={productData.image} style={imageContainer} alt="Hola" />
            <div style={info}>
              <div style={text}>{productData.name}</div>
              <div style={text}>{productData.price} Rs</div>

              <div style={text}>
                {" "}
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e)=>filterGold(e)}
                    name="gold_clarity"
                  >
                    <option>Select Gold Purity</option>
                    <option value="18">18K</option>
                    <option value="20">20K</option>
                    <option value="24">24K</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e)=>filterGold(e)}
                    name="colour"
                  >
                    <option>Select Gold Colour</option>
                    <option value="White Gold">White Gold</option>
                    <option value="Yellow Gold">Yellow Gold</option>
                    <option disabled={disable} value="Rose Gold">Rose Gold</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
