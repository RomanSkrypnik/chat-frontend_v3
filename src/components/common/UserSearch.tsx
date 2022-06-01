import React, {FC, useEffect, useState} from 'react';
import DialContainer from "../containers/DialContainer";
import CardContainer from "../containers/CardContainer";
import TextInput from "../inputs/TextInput";
import {useForm} from "react-hook-form";
import {UserDto} from "../../types";
import {UserService} from "../../services/UserService";
import UserSearchItem from "../partials/UserSearchItem";

interface UserSearchProps {
    onClose: () => void;
}

interface FormValues {
    search: string;
}

const UserSearch: FC<UserSearchProps> = ({onClose}) => {
    const [users, setUsers] = useState<[] | UserDto[]>([]);

    const {control, watch, handleSubmit} = useForm<FormValues>();

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSubmit)());

        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const onSubmit = async (data: FormValues) => {
        const {data: users} = await UserService.usersBySearch(data.search);
        setUsers(users.data);
    }

    const fetchUsers = async () => {
        const {data} = await UserService.users();
        setUsers(data.data);
    }

    return (
        <DialContainer onClose={onClose}>
            <CardContainer className="_extended" title="User search" onClose={onClose}>
                <div className="user-search">
                    <TextInput defaultValue="" control={control} name="search" placeholder="Search Users"/>
                    <div className="user-search__list scrollbar">
                        {
                            users.map(user => <UserSearchItem onClose={onClose} user={user}/>)
                        }
                    </div>
                </div>
            </CardContainer>
        </DialContainer>
    );
};

export default UserSearch;