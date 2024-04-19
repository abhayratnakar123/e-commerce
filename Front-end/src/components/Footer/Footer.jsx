import { Link } from "react-router-dom";
import "./Footer.css";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
    <div style={{color:'white'}} className="containerr p-4 bg-black">
      <div className="footer">
        <div className="about">
          <div className="title">About</div>
          <div className="text">
            {" "}
            Luxelane is a luxury product webstore where where you can browse and buy a wide range of popular and luxury products and the cheapest of prices.
          </div>
        </div>

        <div className="contact">
          <div className="title">Contact</div>

          <div className="c-item">
            <FaLocationArrow />
            <div className="text">
            Camphor Estate, CB Ganj, Bareilly, Uttar Pradesh 243502
            </div>
          </div>

          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone: 0981 375 1099</div>
          </div>

          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email: luxelane@store.com</div>
          </div>
        </div>

        <div className="links">
          <div className="categories">
            <div className="title">Categories</div>
            <Link to={`/products?category=Headphones`} className="text hover:underline focus:underline">Headphones</Link>
            <Link to={`/products?category=Watches`} className="text hover:underline focus:underline">Smart Watches</Link>
            <Link to={`/products?category=Speakers`} className="text hover:underline focus:underline">Bluetooth Speakers</Link>
            <Link to={`/products?category=Earbuds`} className="text hover:underline focus:underline">Wireless Earbuds</Link> 
          </div>

          <div className="pages">
            <div className="title">Pages</div>
            <Link to="/" className="text hover:underline focus:underline">Home</Link>
            <Link to="/products" className="text hover:underline focus:underline">Products</Link>      
            <Link to="/addProduct" className="text hover:underline focus:underline">About</Link>      
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <span className="text text-start">
            LUXELANE 2024 <br />
            Copyright &copy; All rights reserved | Luxelane
          </span> 
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
