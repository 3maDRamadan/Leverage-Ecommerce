import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Swal from "sweetalert2";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoadin] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
    Swal.fire({
      title: "You added A New Item To Cart",
      icon: "success",
    });
  };

  const getProduct = () => {
    setLoadin(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
    setLoadin(false);
  };
  useEffect(() => {
    getProduct();
  }, []);

  const Loading = () => {
    return <>Loading...</>;
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-Bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-danger px-4 py-2"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark px-4 py-2 ms-2">
            Go to Cart
          </Link>
        </div>
      </>
    );
  };
  // const newItemToCart = () => {
  //   Swal.fire({
  //     title : "You added A New Item To Cart",
  //     icon : "success"
  //   })
  // }
  return (
    <div>
      <div className="container pt-5">
        <div className="row pt-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
