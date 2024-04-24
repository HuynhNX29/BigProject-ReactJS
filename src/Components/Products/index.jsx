import { useEffect, useState } from "react";
import React from 'react';
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";
import { Badge, Button, Card, Image, List, message, Rate, Typography, Spin } from "antd";
import { Select } from 'antd';
import Column from "antd/es/table/Column";
import { useParams } from 'react-router-dom';


const Products = () => {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('az');

    const param = useParams();

    useEffect(() => {
        setLoading(true);
        (param?.categoryId
            ? getProductsByCategory(param.categoryId)
            : getAllProducts()
        ).then((res) => {
            setItems(res.products);
            setLoading(false);
        })
    }, [param]);



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




    return (
        <div className="productContainer">

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

            <List
                loading={loading}
                grid={{ column: 3 }}
                renderItem={(product, index) => {

                    return (

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
                                        disabled
                                        value={product.rating} />,
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
                    )
                }} dataSource={getSortedItems()}>

            </List>
        </div>
    );
}

function AddToCartButton({ item }) {

    const [loading, setLoading] = useState(false);

    const addProductToCart = () => {
        setLoading(true);
        addToCart(item.id).then(res => {
            message.success(`${item.title} has been added to cart`)
        })

        setLoading(false);
    }

    return <Button type="link"
        onClick={() => { addProductToCart(); }}
        loading={loading}
    >Add To Cart</Button>;
}



export default Products;


//34