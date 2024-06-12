import React, { createContext, useContext, ReactNode } from 'react';
import { message } from 'antd';

type NotificationType = 'success' | 'error';

interface NotificationContextType {
    notify: (type: NotificationType, content: React.ReactNode) => void;
}

interface NotificationProviderProps {
    children: ReactNode;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const notify = (type: NotificationType, content: ReactNode) => {
        messageApi.open({
            type: type,
            content: content,
        });
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};
