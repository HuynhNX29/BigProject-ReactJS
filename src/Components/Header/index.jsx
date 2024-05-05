import React, { useState, useEffect } from "react";
import { Badge, Button, Checkbox, Drawer, Form, Input, Menu, Space, Table } from 'antd';
import { message } from 'antd';
import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Typography from "antd/es/typography/Typography";
import { getCart } from "../../API";
import { useContext } from 'react';
import StoreContext from "../../Context/context";
import { FcBusinessman } from "react-icons/fc";

import { InputNumber } from 'antd';

const AppHeader = () => {

  const navigate = useNavigate();


  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  }








  return <div className="appHeader">

    <Menu
    theme="light"
      className="appMenu"
      onClick={onMenuClick}
      mode="horizontal"
      items={

        [
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Shirts",
                key: "mens-shirts"
              },
              {
                label: "Shoes",
                key: "mens-shoes"
              },
              {
                label: "Watches",
                key: "mens-watches"
              }
            ]
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Dresses",
                key: "womens-dresses"
              },
              {
                label: "Shoes",
                key: "womens-shoes"
              },
              {
                label: "Watches",
                key: "womens-watches"
              },
              {
                label: "Bags",
                key: "womens-bags"
              },
              {
                label: "Jewellery",
                key: "womens-jewellery"
              }
            ]
          },
          {
            label: "Accessories",
            key: "accessories",
          }
        ]
      } />
    <Typography.Title>Online Store</Typography.Title>
    <AppCart />
  </div>;
};


function AppCart() {

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const context = useContext(StoreContext);
  const { cart } = context.store;


  // useEffect(() => {
  //   getCart().then((res) => {
  //     setCartItems(res.products);
  //   })

  // }, []);

  const onConfirmOrder = (values) => {
    // console.log(values);
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);

    context.setStore({
      cart: [],
    });

    message.success("Your order has been created successfully")
  }

  const handleCheckOutYourCart = (values) => {
    if (cart.length > 0) {
      setCheckoutDrawerOpen(true)
    }
    else {
      message.warning("Your cart is empty")
    }


  }

  const handleDeleteItem = (item) => {
    // console.log(item);
    // console.log(cart);
    const newCart = cart.filter(_item => _item !== item);
    // console.log(newCart);
    context.setStore({
      cart: newCart,
    });

  }



  const handleIncreaseQuantity = (item) => {
    // console.log(item);

    const newCart = [...cart];
    // console.log(newCart);

    const index = newCart.indexOf(item);
    // console.log(index);

    // newCart[index].quantity ? newCart[index].quantity + 1 : 1

    // console.log(newCart[index]);


    newCart[index].quantity += 1;

    // console.log(newCart[index].quantity);
    context.setStore({
      cart: newCart
    });

    // console.log(newCart);
  }


  const handleDecreaseQuantity = (item) => {

    const newCart = [...cart];
    const index = newCart.indexOf(item);
    if (newCart[index].quantity > 0) {
      newCart[index].quantity -= 1;
      context.setStore({
        cart: newCart
      });
    }


  }


  return (
    <div style={{ cursor: "pointer" }}>
      <Badge count={cart.length}
        className="shoppingCartIcon"
        onClick={() => { setCartDrawerOpen(true) }}
      >
        <ShoppingCartOutlined />

      </Badge >

      <Drawer open={cartDrawerOpen}
        onClose={() => { setCartDrawerOpen(false) }}
        // afterOpenChange={handleCalculate()}
        title="Your Cart"
        contentWrapperStyle={{ width: '100%' }}
      >

        <Table
          columns={[{
            title: "Titles",
            dataIndex: "title"
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => {
              // iPrice = value;
              return <span>${value}</span>
            }
          },
          {
            title: "Quantity",
            dataIndex: 'quantity',
            render: (value, record) => {
              return <span>{value}</span>



              // <InputNumber
              //   min={0}
              //   defaultValue={1}
              //   onChange={(val) => {

              //     // record.quantity = val
              //     context.setStore({
              //       ...cart, quantity: val
              //     });

              //   }}

              // ></InputNumber>
            }
          },
          {
            title: "Total",
            dataIndex: 'total',
            render: (_, record) => {
              return <span>${record.price * record.quantity}</span>
            }
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button
                  onClick={() => handleIncreaseQuantity(record)}
                >+</Button>

                <Button
                  onClick={() => handleDecreaseQuantity(record)}
                >-</Button>

                <Button
                  onClick={() => handleDeleteItem(record)}
                >Delete</Button>



              </Space>
            ),
          },

          ]}

          dataSource={cart}
          pagination={false}

        />

        <h4>
          Total: ${cart.reduce((a, b) => a + b.price * b.quantity, 0)}
        </h4>

        <Button
          onClick={() => handleCheckOutYourCart()}
          type="primary">Check Out Your Cart</Button>

      </Drawer>



      <Drawer open={checkoutDrawerOpen}
        onClose={() => { setCheckoutDrawerOpen(false) }}
        title="Check Out Your Cart"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[{
              required: true,
              message: "Please enter your full name"
            }]}
            label="Full Name"
            name="full_name">

            <Input placeholder="Enter your full name." />
          </Form.Item>



          <Form.Item
            rules={[{
              required: true,
              type: "email",
              message: "Please enter your email"
            }]}
            label="Email"
            name="your_email">

            <Input placeholder="Enter your email." />
          </Form.Item>



          <Form.Item
            rules={[{
              required: true,
              message: "Please enter your address"
            }]}
            label="Address"
            name="your_address">

            <Input placeholder="Enter your address." />
          </Form.Item>

          <Form.Item
            rules={[{
              required: true,
              message: "Please enter your phone number"
            }]}
            label="Phone Number"
            name="your_phonenumber">

            <Input maxLength={15}
              type="tel"
              placeholder="Enter your phone number."
              pattern="[0-9]{2}-[0-9]{9}"
              required
            />
          </Form.Item>


          <Form.Item>
            <Checkbox
              defaultChecked
              disabled
            >
              Cash on delivery
            </Checkbox>
          </Form.Item>


          <Typography.Paragraph type="secondary">
            More methods coming soon.
          </Typography.Paragraph>


          <Button
            type="primary"
            htmlType="submit"
          // onClick={() => {
          //   // setCartDrawerOpen(false) &&
          //   setCheckoutDrawerOpen(false)
          //     && setCartDrawerOpen(false)
          // }}

          >Confirm your order</Button>
        </Form>
      </Drawer>


    </div>

  )
}


export default AppHeader;
