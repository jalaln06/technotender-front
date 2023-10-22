import React from 'react';

import './loading-wrapper.less';

export interface LoadingWrapperProps {
    children: React.ReactNode;
    width?: number;
}
export const LoadingWrapper = ({width, children}: LoadingWrapperProps) => (
    <div
        className="loading-wrapper"
        style={{width}}
    >
        {children}
    </div>
);
