import React from 'react';
import {ConfigProvider} from 'antd';

const InputBaseStyles = {
    colorText: '#999999',
    borderRadius: 12,
    colorBorder: '#fff',
    colorBgContainer: '#F2F2F2',
    colorTextPlaceholder: '#999999',
};

export interface ThemeProps {
    children: React.ReactNode;
}

export const Theme = ({children}: ThemeProps) => (
    <ConfigProvider
        theme={{
            components: {
                Input: {
                    ...InputBaseStyles,
                },
                Select: {
                    ...InputBaseStyles,
                },
                DatePicker: {
                    ...InputBaseStyles,
                },
                Form: {
                    labelFontSize: 12,
                    itemMarginBottom: 17,
                },
                Button: {
                    linkFocusDecoration: 'none',
                    borderRadius: 16,
                    padding: 15,
                },
            },
        }}
    >{children}
    </ConfigProvider>
);
