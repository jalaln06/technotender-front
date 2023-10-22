import React from 'react';
import {ConfigProvider} from 'antd';

const InputBaseStyles = {
    colorText: '#999999',
    borderRadius: 12,
    colorBorder: '#00000033',
    colorTextPlaceholder: '#999999',

    colorError: '#F00000',
    colorErrorText: '#F00000',
    colorErrorBg: '#F000001A',
    colorErrorBgHover: '#F000001A',
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
                    colorLink: '#007AFF',
                },
                Typography: {
                    fontWeightStrong: 700,
                },
                Divider: {
                    colorSplit: '#E4E4E4',
                },
            },
        }}
    >
        {children}
    </ConfigProvider>
);
