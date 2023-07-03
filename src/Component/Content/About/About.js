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
                </Button>
            </Button.Group>
            <QRCode
                errorLevel="H"
                size={size}
                iconSize={size / 4}
                value="https://s-wms.autonsi.com/"
                icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
        </div>
    );
};
export default About;