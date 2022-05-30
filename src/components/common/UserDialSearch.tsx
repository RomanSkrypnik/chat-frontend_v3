import React, {FC} from 'react';
import DialContainer from "../containers/DialContainer";
import CardContainer from "../containers/CardContainer";

interface UserDialSearch {
    onClose: () => void;
}

const UserDialSearch: FC<UserDialSearch> = ({onClose}) => {
    return (
        <DialContainer onClose={onClose}>
            <CardContainer>

            </CardContainer>
        </DialContainer>
    );
};

export default UserDialSearch;