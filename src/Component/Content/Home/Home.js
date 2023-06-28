import React from 'react'
import '../../../Css/HomeCss.css'
import Login from '../../Login/Login'
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useState, useEffect } from 'react';
import { Carousel, Card, Col, Row } from 'antd';

// const request = async () => {
//     const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'ce2234ad95msh9d8c5043404fc84p1913a6jsn5df080088056',
//             'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
//         }
//     };
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }

export default function Home() {
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const { Meta } = Card;
    const [data, setData] = useState([])
    var a = 2
    var url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    useEffect(() => {
        request()
    }, [])

    const request = async () => {
        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
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


    function btn() {
        setCurrent("123")
        console.log("btn  ");
    }
    const contentStyle = {
        height: '300px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const img = "https://cdn.sforum.vn/sforum/wp-content/uploads/2022/03/3-32.jpg"
    const img2 = "https://bloghomestay.vn/wp-content/uploads/2023/01/999-anh-game-3d-hinh-game-online-dep-nhat-danh-cho-game-thu_22.jpg"
    const img3 = "https://bloghomestay.vn/wp-content/uploads/2023/01/999-anh-game-3d-hinh-game-online-dep-nhat-danh-cho-game-thu_5.jpg"
    const img4 = "https://bloghomestay.vn/wp-content/uploads/2023/01/999-anh-game-3d-hinh-game-online-dep-nhat-danh-cho-game-thu_8.jpg"
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
