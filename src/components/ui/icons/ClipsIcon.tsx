import React, {FC} from 'react';
import cn from 'classnames'

interface ClipsIconProps {
    className?: string;
}

const ClipsIcon: FC<ClipsIconProps> = ({className}) => {
    return (
        <svg className={cn('clips-icon', className)} width="16" height="16" viewBox="0 0 16 16" fill="#2A8BF2" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.0775 4.14191C10.7882 3.91391 10.3695 3.96591 10.1422 4.25591L5.43883 10.2612L3.18616 7.46324C2.95416 7.17724 2.53549 7.13058 2.24883 7.36191C1.96149 7.59324 1.91683 8.01324 2.14683 8.29924L4.92616 11.7512C5.05349 11.9086 5.24416 11.9999 5.44616 11.9999H5.45083C5.65349 11.9986 5.84549 11.9046 5.97083 11.7439L11.1915 5.07724C11.4188 4.78791 11.3682 4.36858 11.0775 4.14191ZM14.4108 4.14191C14.1208 3.91391 13.7028 3.96591 13.4755 4.25591L8.77216 10.2612L8.36949 9.76191L7.52616 10.8399L8.25949 11.7512C8.38682 11.9086 8.57749 11.9999 8.77949 11.9999H8.78416C8.98682 11.9986 9.17882 11.9046 9.30416 11.7439L14.5248 5.07724C14.7522 4.78791 14.7015 4.36858 14.4108 4.14191ZM6.6533 7.62964L5.80863 8.70697L5.48063 8.29964C5.24996 8.01297 5.29463 7.59297 5.58196 7.36164C5.8693 7.13097 6.28863 7.17697 6.5193 7.46364L6.6533 7.62964Z" fill="#231F20"/>
            <mask id="mask0_1_492" maskUnits="userSpaceOnUse" x="2" y="3" width="13" height="9">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.0775 4.14191C10.7882 3.91391 10.3695 3.96591 10.1422 4.25591L5.43883 10.2612L3.18616 7.46324C2.95416 7.17724 2.53549 7.13058 2.24883 7.36191C1.96149 7.59324 1.91683 8.01324 2.14683 8.29924L4.92616 11.7512C5.05349 11.9086 5.24416 11.9999 5.44616 11.9999H5.45083C5.65349 11.9986 5.84549 11.9046 5.97083 11.7439L11.1915 5.07724C11.4188 4.78791 11.3682 4.36858 11.0775 4.14191ZM14.4108 4.14191C14.1208 3.91391 13.7028 3.96591 13.4755 4.25591L8.77216 10.2612L8.36949 9.76191L7.52616 10.8399L8.25949 11.7512C8.38682 11.9086 8.57749 11.9999 8.77949 11.9999H8.78416C8.98682 11.9986 9.17882 11.9046 9.30416 11.7439L14.5248 5.07724C14.7522 4.78791 14.7015 4.36858 14.4108 4.14191ZM6.6533 7.62964L5.80863 8.70697L5.48063 8.29964C5.24996 8.01297 5.29463 7.59297 5.58196 7.36164C5.8693 7.13097 6.28863 7.17697 6.5193 7.46364L6.6533 7.62964Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_1_492)">
                <rect width="16" height="16" fill="#B7BDCB"/>
            </g>
        </svg>
    );
};

export default ClipsIcon;