import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useParams} from "react-router-dom";
import {fetchUser} from "../../store/slices/user";
import {useAppDispatch} from "../../store";
import withAuthorized from "../../hocs/Authorized";

const Profile = () => {

    const {hash} = useParams();

    const dispatch = useAppDispatch();

    const {user} = useTypedSelector(state => state.user);

    useEffect(() => {
        if (hash) {
            dispatch(fetchUser(hash));
        }
    }, [hash])

    return (
        <section className="profile">
            <div className="container">
                {user?.name}
            </div>
        </section>
    );
};

export default withAuthorized(Profile);