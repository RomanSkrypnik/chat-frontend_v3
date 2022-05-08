import React, {FC} from 'react';

interface TypographyProps {
    as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    fz?: number | string;
    lh?: number | string;
    children: string;
    className?: string;
}

const Typography: FC<TypographyProps> = ({as = 'div', children, fz, lh, className}) => {

    const Tag = as;

    return (
        <Tag className={className} style={{fontSize: fz, lineHeight: lh}}>
            {children}
        </Tag>
    );
};

export default Typography;