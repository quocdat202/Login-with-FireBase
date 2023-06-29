import React, { useEffect, useState } from 'react';
import { Button, Carousel, Form, Input, message, Col, Row } from 'antd';

export default function GameDetail({ match }) {
    const [dataDrtail, setDataDetail] = useState([])

    const urlDetail = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${match?.match?.params?.id}`
    const contentStyle = {
        height: '460px',
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
            const response = await fetch(urlDetail, options);
            const result = await response.json();
            setDataDetail(result);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        request()
    }, [])

    return (
        <div style={{ padding: '30px 30px' }}>
            <Row>
                <Col span={12} style={{ padding: '0 50px' }} >
                    <Carousel autoplay>
                        {
                            dataDrtail?.screenshots?.map((item) => {
                                return (
                                    <div style={contentStyle}>
                                        <img style={{ width: '100%' }} src={item?.image} />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </Col>
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {dataDrtail?.description}
                </Col>
            </Row>
        </div>

    )
}
