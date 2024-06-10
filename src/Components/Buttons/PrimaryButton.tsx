import {Button, ConfigProvider} from "antd";
import React from "react";

interface PrimaryButtonProps {
    text: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text }) => {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00b96b',
                    },
                }}
            >
                <Button type="primary" htmlType="submit">{text}</Button>
            </ConfigProvider>
        </>
    );
}

export default PrimaryButton;