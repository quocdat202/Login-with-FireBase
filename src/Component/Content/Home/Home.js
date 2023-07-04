import { Button, Card, Carousel, Pagination, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../../Css/HomeCss.css';

export default function Home({ user, openNotificationWithIcon }) {
    const { Meta } = Card;
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)
    const history = useHistory()
    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const img = "https://cdn.sforum.vn/sforum/wp-content/uploads/2022/03/3-32.jpg"
    const img2 = "https://bloghomestay.vn/wp-content/uploads/2023/01/999-anh-game-3d-hinh-game-online-dep-nhat-danh-cho-game-thu_22.jpg"
    const img3 = "https://bloghomestay.vn/wp-content/uploads/2023/01/999-anh-game-3d-hinh-game-online-dep-nhat-danh-cho-game-thu_5.jpg"
    const img4 = "https://bloghomestay.vn/wp-content/uploads/2023/01/999-anh-game-3d-hinh-game-online-dep-nhat-danh-cho-game-thu_8.jpg"
    const contentStyle = {
        height: '300px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };


    const request = async () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ce2234ad95msh9d8c5043404fc84p1913a6jsn5df080088056',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        request()
    }, [])

    const handlePageChange = (page, pageSize) => {
        const newOffset = (page - 1) * pageSize;
        setOffset(newOffset);
        setLimit(pageSize);
    };



    const addToCart = (item) => {
        const inCart = localStorage.getItem(`carts${user?.uid}`);
        const cart = {
            ...item,
            userID: user?.uid,
            quantity: 1
        };

        if (user?.uid) {
            if (inCart) {
                let isCart = JSON.parse(inCart);
                let find = false;
                isCart = isCart.map(element => {
                    if (element.id === item?.id) {
                        find = true;
                        return { ...element, quantity: element.quantity + 1 };
                    } else {
                        return element;
                    }
                });

                if (!find) {
                    isCart.push(cart);
                }

                localStorage.setItem(`carts${user?.uid}`, JSON.stringify(isCart));
                return openNotificationWithIcon('success', "Success!", "Add cart successfully !")
            } else {
                localStorage.setItem(`carts${user?.uid}`, JSON.stringify([cart]));
                return openNotificationWithIcon('success', "Success!", "Add cart successfully !")
            }
        } else {
            return openNotificationWithIcon('warning', "Warning !", "Please login to continue !")
        }
    };


    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src={img} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src={img2} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src={img3} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src={img4} />
                    </h3>
                </div>

            </Carousel>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', padding: 40, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        data?.length > 0 ? data.slice(offset, offset + limit).map((item) => {
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
                                    cover={
                                        <img alt={item?.thumbnail} src={item?.thumbnail} />
                                    }
                                    actions={[
                                        <span style={{ fontWeight: '500', color: 'black' }}>Price: {(item?.id * 23).toLocaleString()}$</span>,
                                        <Button onClick={() => addToCart(item)}>Add to cart</Button>
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
                        }) : ''
                    }
                </div>
                <div>
                    {
                        data?.length > 0 && (
                            <Pagination
                                current={Math.floor(offset / limit) + 1}
                                pageSize={limit}
                                total={data.length}
                                onChange={handlePageChange}
                            />
                        )
                    }
                </div>
            </div>

        </div >
    );
}
