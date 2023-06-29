import { Card, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../../Css/HomeCss.css';

export default function Home() {
    const { Meta } = Card;
    const [data, setData] = useState([])
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
            setData(result.slice(0, 50));
            console.log(result.slice(0, 50));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        request()
    }, [])

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
                        data?.length > 0 ? data?.map((item) => {
                            return (
                                <Card
                                    onClick={() => history.push(`/game/${item?.id}`)}
                                    hoverable
                                    style={{
                                        width: 320,
                                        height: 390,
                                        paddingBottom: 10,
                                        marginRight: 20,
                                        marginBottom: 20
                                    }}
                                    cover={
                                        <img alt="example" src={item?.thumbnail} />
                                    }
                                    actions={[
                                        <span style={{ fontWeight: '500', color: 'black' }}>Price: {(item?.id * 23).toLocaleString()}$</span>
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
            </div>

        </div >
    );
}
