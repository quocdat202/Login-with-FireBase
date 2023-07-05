import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, QRCode } from 'antd';
import { useState } from 'react';
const About = () => {
    const [size, setSize] = useState(160);
    const increase = () => {
        setSize((prevSize) => {
            const newSize = prevSize + 10;
            if (newSize > 300) {
                return 300;
            }
            return newSize;
        });
    };
    const decline = () => {
        setSize((prevSize) => {
            const newSize = prevSize - 10;
            if (newSize < 48) {
                return 48;
            }
            return newSize;
        });
    };

    const clickBtn = async () => {
        const url = 'https://device-specs1.p.rapidapi.com/laptops';
        const options = {
            method: 'GET',
            headers: {
                Authorization: '<REQUIRED>',
                'X-RapidAPI-Key': 'ce2234ad95msh9d8c5043404fc84p1913a6jsn5df080088056',
                'X-RapidAPI-Host': 'device-specs1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', padding: 50 }}>
            <Button.Group
                style={{
                    marginBottom: 16,
                }} >
                <Button onClick={decline} disabled={size <= 48} icon={<MinusOutlined />}>
                    Smaller
                </Button>
                <Button onClick={increase} disabled={size >= 300} icon={<PlusOutlined />}>
                    Larger
                </Button> <Button onClick={clickBtn} disabled={size >= 300} icon={<PlusOutlined />}>
                    API
                </Button>
            </Button.Group>
            <QRCode
                errorLevel="H"
                size={size}
                iconSize={size / 4}
                value="https://free-game.vercel.app/"
            // icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
        </div>
    );
};
export default About;