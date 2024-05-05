import { Typography } from 'antd';
import React from 'react';
import './footer.css';


const Footer = () => {
  return (
    <div className='appFooter'>
      {/* <Typography.Link href='https://google.com.vn' target={'_blank'}>Privacy Policy </Typography.Link>
      <Typography.Link href='https://google.com.vn' target={'_blank'}>Term & Condition </Typography.Link>
      <Typography.Link href='https://google.com.vn' target={'_blank'}>Return Policy </Typography.Link>
      <Typography.Link href='tel: +84934093243' target={'_blank'}>+84934093243 </Typography.Link> */}
      {/* <!-- Site footer --> */}
      <footer class="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <h6>About</h6>
              <p class="text-justify">Online Store <br />Your Style, Your Smile</p>

            </div>

            <div class="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul class="footer-links">
                <li><a href="http://localhost:3000/mens-shirts">Men's Shirts</a></li>
                <li><a href="http://localhost:3000/mens-shoes">Men's Shoes</a></li>
                <li><a href="http://localhost:3000/mens-watches">Men's Watches</a></li>
                <li><a href="http://localhost:3000/mens-watches">Women's Dresses</a></li>
                <li><a href="http://localhost:3000/womens-shoes">Women's Shoes</a></li>
                <li><a href="http://localhost:3000/womens-watches">Women's Watches</a></li>
                <li><a href="http://localhost:3000/womens-bags">Women's Bags</a></li>
                <li><a href="http://localhost:3000/womens-jewellery">Women's Jewellery</a></li>

              </ul>
            </div>

            <div class="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul class="footer-links">
                <li><a href="http://google.com/">About Us</a></li>
                <li><a href="http://google.com/">Contact Us</a></li>
                <li><a href="http://google.com/">Contribute</a></li>
                <li><a href="http://google.com/">Privacy Policy</a></li>
                <li><a href="http://google.com/maps/">Sitemap</a></li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <p class="copyright-text">Copyright &copy; 2017 All Rights Reserved by &nbsp;
                <a href="#">Online Store</a>.
              </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
              <ul class="social-icons">
                <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
                <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

