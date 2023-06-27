import React from 'react'
import '../../../Css/HomeCss.css'
import Login from '../../Login/Login'
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useState, useEffect } from 'react';
import { Carousel } from 'antd';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];

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

    const [data, setData] = useState()
    var a = 2
    var url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(res => console.log(res))
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
            console.log(result.slice(0, 50));
        } catch (error) {
            console.error(error);
        }
    }

    request()
    function btn() {
        setCurrent("123")
        console.log("btn  ");
    }
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const img = "https://static1.bestie.vn/Mlog/UploadFacebookThumbs/201905/5-ly-do-khien-ban-nen-ra-rap-xem-avengers-endgame-ngay-0a29f7.jpg"
    return (
        <>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>
                        <img src={img} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src={img} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src={img} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src={img} />
                    </h3>
                </div>

            </Carousel>

        </>
    );
}
