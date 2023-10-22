import React from 'react';

import './page-head.less';

export interface PageHeadProps {
    children: React.ReactNode;
}

export const PageHead = ({children}: PageHeadProps) => (
    <div className="page-head">
        {children}
    </div>
);
