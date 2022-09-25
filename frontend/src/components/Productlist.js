import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

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

const text = {
  fontWeight: "500",
};
const btn = {
  padding: "5px",
  border: "2px solid grey",
  backgroundColor: "white",
  cursor: "pointer",
  fontWeight: "500",
  transition: " all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

function Productlist(props) {
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);

  const callApi = () => {
    axios
      .get("http://localhost:4000/api/v1/products")
      .then((res) => {
        if (res) {
          console.log("This is reposnce ", res);
          setProductData(res.data);
        }
      })
      .catch((err) => {
        console.log("This is error", err);
      });
  };

  const showProduct = (id) => {
    navigate(`product/${id}`, { replace: true });
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <><Button onClick = {()=> navigate("/addNew",{replace : true})} >ADD NEW</Button></>
      <div style={mainContainer}>
        {productData.map((product, index) => {
          console.log("This is product", product);
          return (
            <div key={index} style={Container}>
              <img
                src={product.image}
                style={imageContainer}
                alt={product.name}
              />
              <div style={text}>{product.name}</div>
              <button style={btn} onClick={() => showProduct(product._id)}>
                Show
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Productlist;
