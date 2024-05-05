import { useContext, useEffect, useState } from "react";
import React from 'react';
import { AddToCart, getAllProducts, getProductsByCategory } from "../../API";
import { Badge, Button, Card, Image, List, message, Rate, Typography, Spin } from "antd";
import { Select, Input } from 'antd';
import Column from "antd/es/table/Column";
import { useParams } from 'react-router-dom';
import StoreContext from "../../Context/context";


const { Search } = Input;

const Products = () => {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('az');
    const [searchKey, setSearchKey] = useState('');

    // const perItems = []

    const [permanentItemsList, setPermanentItemsList] = useState([]);
    // const [cart, setCart] = useState([]);

    const context = useContext(StoreContext);

    // console.log(context);

    const param = useParams();

    useEffect(() => {
        setLoading(true);
        (param?.categoryId
            ? getProductsByCategory(param.categoryId)
            : getAllProducts()
        ).then((res) => {

            const addToItems = []
            res.products.forEach(item => {
                addToItems.push({ ...item, quantity: 1, total: 0 });
            });

            setItems(addToItems);
            setPermanentItemsList(addToItems);
            setLoading(false);
        })
    }, [param]);




    useEffect(() => {

        // console.log(searchKey);
        // console.log(permanentItemsList);

        if (!searchKey) {
            setItems(permanentItemsList);
        }
        else {
            // console.log("Have a searchkey");
            handleSearch();
        }

    }, [searchKey]);


    if (loading) {
        return <Spin
            tip="Loading"
            spinning
            style={{ position: "absolute", top: "50vh", right: "50vw" }}
            size="large"
        ></Spin>
    }


    const getSortedItems = () => {
        const sortedItems = [...items];



        sortedItems.sort((a, b) => {

            const aLowerCaseTitle = a.title.toLowerCase();
            const bLowerCaseTitle = b.title.toLowerCase();


            if (sortOrder === "az") {
                return aLowerCaseTitle > bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1;
            }

            else if (sortOrder === "za") {
                return aLowerCaseTitle < bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1;
            }

            else if (sortOrder === "lowHight") {
                return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
            }

            else if (sortOrder === "highLow") {
                return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
            }
        })
        return sortedItems;
    }

    // const addToCart = (item) => {
    //     // console.log(item);

    //     const items = [...context.store.cart];

    //     const index = items.findIndex(element => element.id === item.id);
    //     // console.log(`index: ${index}`);
    //     if (index !== -1) {

    //         // message.success(`${item.title} has been added to cart`);

    //         const newItem = items[index];
    //         newItem.quantity = newItem.quantity ? newItem.quantity + 1 : 1;

    //     }

    //     else {
    //         items.push(item);
    //     }

    //     context.setStore({
    //         cart: items,
    //     });

    // }

    const handleSearch = () => {
        // console.log(searchKey);
        // console.log(getSortedItems());

        const items = permanentItemsList.filter((element) => (element.title).toLowerCase().includes(searchKey))
        // console.log(items);
        setItems(items);
    }


    // ///////////////////////////////TEST FUNCTIONS
    // console.log(context.store);

    return (
        <div className="productContainer">

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Typography.Text>View Items Sorted By: </Typography.Text>
                    <Select
                        size="large"
                        defaultValue={"az"}
                        onChange={(value) => { setSortOrder(value) }}
                        options={[
                            {
                                label: 'Sort by A-Z',
                                value: 'az'
                            },
                            {
                                label: 'Sort by Z-A',
                                value: 'za'
                            },
                            {
                                label: 'Price: Low - High',
                                value: 'lowHight'
                            },
                            {
                                label: 'Price: High - Low',
                                value: 'highLow'
                            }
                        ]}>

                    </Select>
                </div>
                <div>
                    {/* <Typography.Text>Search anything:  </Typography.Text> */}
                    <Search placeholder="Search..."
                        prefix
                        size="large"
                        allowClear
                        onSearch={handleSearch}
                        onPressEnter={handleSearch}
                        onChange={(val) => setSearchKey(val.target.value)}
                    />

                </div>
            </div>

            <List
                loading={loading}
                pagination
                grid={{ column: 3 }}
                renderItem={(product, index) => {

                    return (

                        <div>
                            <Badge.Ribbon
                                className="itemCardBadge"
                                text={`-${product.discountPercentage}%`}
                                color="pink">
                                <Card
                                    className="itemCard"
                                    title={product.title}
                                    key={index}
                                    cover={<Image className="itemCardImage" src={product.thumbnail} />}
                                    actions={[
                                        <Rate
                                            allowHalf
                                            // disabled
                                            defaultValue={product.rating} />,

                                        <AddToCartButton item={product} />

                                    ]}

                                >
                                    <Card.Meta

                                        title={

                                            <Typography.Paragraph>
                                                ${product.price}{" "}
                                                <Typography.Text delete type="danger">
                                                    $
                                                    {parseFloat(
                                                        (product.price +
                                                            (product.price * product.discountPercentage / 100))
                                                            .toFixed(2))}
                                                </Typography.Text>
                                            </Typography.Paragraph>}

                                        description={<Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>{product.description}</Typography.Paragraph>}

                                    ></Card.Meta>
                                </Card>
                            </Badge.Ribbon>
                            {/* <Button type="primary"
                                onClick={() => addToCart(product)}
                            >Add To Cart</Button> */}
                        </div>




                    )
                }} dataSource={getSortedItems()}>

            </List>
        </div>
    );
}

function AddToCartButton({ item }) {

    const context = useContext(StoreContext);


    const [loading, setLoading] = useState(false);

    const addProductToCart = () => {
        setLoading(true);

        // console.log(item);

        const items = [...context.store.cart];

        const index = items.findIndex(element => element.id === item.id);
        // console.log(`index: ${index}`);
        if (index !== -1) {

            message.warning(`${item.title} is already in your cart`);

            const newItem = items[index];
            newItem.quantity = newItem.quantity ? newItem.quantity + 1 : 1;

        }

        else {
            items.push(item);
            message.success(`${item.title} has been added to cart successfully`);

        }

        context.setStore({
            cart: items,
        });




        setLoading(false);
    }

    return <Button type="primary"
        onClick={() => { addProductToCart(); }}
        loading={loading}
    >Add To Cart</Button>;
}



export default Products;


//34