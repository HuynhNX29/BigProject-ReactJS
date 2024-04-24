import React, { useState, useEffect } from "react";
import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, Table } from 'antd';
import { message } from 'antd';
import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Typography from "antd/es/typography/Typography";
import { getCart } from "../../API";

const AppHeader = () => {

  const navigate = useNavigate();


  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  }


  return <div className="appHeader">

    <Menu
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

  // const [messageApi, contextHolder] = message.useMessage();

  // const successFunc = () => {
  //   messageApi.open({
  //     type: 'success',
  //     content: 'Your order has been created successfully',
  //   });
  // };

  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    })

  }, []);

  const onConfirmOrder = (values) => {
    // console.log(values);
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);
    // successFunc();
    // <Alert message="Success Tips" type="success" showIcon />

    message.success("Your order has been created successfully")
  }

  return (
    <div style={{ cursor: "pointer" }}>
      <Badge count={7}
        className="shoppingCartIcon"
        onClick={() => { setCartDrawerOpen(true) }}
      >
        <ShoppingCartOutlined />

      </Badge >

      <Drawer open={cartDrawerOpen}
        onClose={() => { setCartDrawerOpen(false) }}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
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
              return <span>${value}</span>
            }
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
            render: (value, record) => {
              return <InputNumber
                min={0}
                defaultValue={value}
                onChange={(value) => {
                  setCartItems(pre => pre.map(
                    cart => {
                      if (record.id === cart.id) {
                        record.total = record.price * value
                      }
                      return cart;
                    }
                  ))
                }}
              ></InputNumber>
            },
          },
          {
            title: "Total",
            dataIndex: "total",
            render: (value) => {
              return <span>${value}</span>
            }
          }

          ]}

          dataSource={cartItems}
          pagination={false}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total

            }, 0)


            return <span>Total: ${total}</span>
          }}
        />

        <Button
          onClick={() => { setCheckoutDrawerOpen(true) }}
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
