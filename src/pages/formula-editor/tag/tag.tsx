import React, {FC} from 'react';
import {Tag as AntdTag} from 'antd';

import './tag.less';

export interface ObjectIslandProps {
    label: string;
}

export const Tag: FC<ObjectIslandProps> = ({label}: ObjectIslandProps) => (
    <AntdTag
        color="blue"
    >
        {label}
    </AntdTag>
);
