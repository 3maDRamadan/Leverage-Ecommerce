import React, { useState, useEffect } from "react";
import "../App.css";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const getProducts = () => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        if (componentMounted) {
          setData(data);
          setFilter(data);
          setLoading(false);
        }
        return () => {
          componentMounted = false;
        };
      });
  };
  useEffect(() => {
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={"350px"} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  // Filter Products

  const filterProduct = (cat) => {
    const updataList = data.filter((x) => x.category === cat);
    setFilter(updataList);
  };

  // Show Products
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery{" "}
          </button>
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product.id}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.slice(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-success"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5 ">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center text-primary">
              Latest Products
            </h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
