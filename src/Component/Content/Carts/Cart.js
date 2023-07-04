import { Button, Card, Carousel, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../../Css/HomeCss.css';
export default function Cart({ user }) {
    const { Meta } = Card;
    const [dataCart, setDataCart] = useState([])

    useEffect(() => {
        const inCart = localStorage.getItem(`carts${user?.uid}`);
        if (inCart) {
            setDataCart(JSON.parse(inCart));
        }
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', padding: 40, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {
                    dataCart?.length > 0 ? dataCart?.map((item) => {
                        return (
                            <Card
                                // onClick={() => history.push(`/game/${item?.id}`)}
                                hoverable
                                style={{
                                    width: 320,
                                    height: 390,
                                    paddingBottom: 10,
                                    marginRight: 20,
                                    marginBottom: 20
                                }}
                                // cover={
                                //     <img alt={item?.thumbnail} src={item?.thumbnail} />
                                // }
                                actions={[
                                    <span style={{ fontWeight: '500', color: 'black' }}>Price: {((item?.id * 23) * item?.quantity).toLocaleString()}$</span>,
                                    <span style={{ fontWeight: '500', color: 'black' }}>Quantity: {item?.quantity}</span>
                                ]}
                            >
                                <Meta
                                    title={item?.title}
                                />
                                <div className="card-description"
                                    style={{
                                        height: '70px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                    {item?.short_description}
                                </div>
                            </Card>
                        );
                    }) : 'Cart is empty'
                }
            </div>

        </div>
    )
}
