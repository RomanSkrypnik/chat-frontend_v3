import React, {useState} from 'react';
import withAuthorized from "../../hocs/Authorized";
import RoomWrapper from "../../components/partials/RoomWrapper";
import {useParams} from "react-router-dom";
import RoomMessageWrapper from "../../components/partials/RoomMessageWrapper";
import Typography from "../../components/common/Typography";
import RegularButton from "../../components/ui/buttons/RegularButton";
import RoomForm from "../../components/partials/RoomForm";

const Rooms = () => {
    const [show, setShow] = useState(false);

    const {hash} = useParams();

    const handleClick = () => setShow(!show);

    return (
        <section className="rooms">
            <div className="d-flex">
                <div className="w-25">
                    <div className="d-flex justify-content-between mb-3">
                        <Typography className="mb-3" fz={36}>Rooms</Typography>
                        <RegularButton onClick={handleClick}>Create New Room</RegularButton>
                    </div>
                    <RoomMessageWrapper/>
                </div>
                {hash && <RoomWrapper/>}
                {show && <RoomForm onClose={handleClick}/>}
            </div>
        </section>
    );
};

export default withAuthorized(Rooms);