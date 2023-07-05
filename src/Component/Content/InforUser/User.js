import React from 'react';
import { Avatar, Typography, Divider } from 'antd';

import '../../../Css/style.css';

const { Title, Text } = Typography;

const User = ({ user }) => {
    console.log("🤔🤔🤔 ~ file: User.js:9 ~ User ~ user:", user)
    return (
        <div className="user-page-container">
            <div className="avatar-container">
                <Avatar size={120} src={user?.avt} />
                <Title level={2}>{user?.userName}</Title>
            </div>
            <Divider />

            <div className="info-container">
                <div className="info-item">
                    <Text type="secondary">Email:</Text>
                    <Text>{user?.email}</Text>
                </div>
                <div className="info-item">
                    <Text type="secondary">Số điện thoại:</Text>
                    <Text>{user?.phone}</Text>
                </div>
            </div>

            <Divider />

            <div>
                <Text type="secondary">Địa chỉ:</Text>
                <Text>{user?.address}</Text>
            </div>
        </div>
    );
};

export default User;
