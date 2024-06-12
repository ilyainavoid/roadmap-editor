import React, {ReactNode} from "react";
import { ConfigProvider} from "antd";

interface MainConfigProps {
    children: ReactNode;
}

const MainConfigProvider: React.FC<MainConfigProps> = ({children }) => {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00b96b',

                    },
                }}
            >
                {children}
            </ConfigProvider>
        </>
    );
}

export default MainConfigProvider;
