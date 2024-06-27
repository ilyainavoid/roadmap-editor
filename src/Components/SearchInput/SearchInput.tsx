import React, { useState } from 'react';
import { Empty, Select } from 'antd';
import { getRoadmaps } from "../../API/Roadmaps/getRoadmaps.ts";
import { getUsers } from "../../API/Users/getUsers.ts";
import { useNavigate } from "react-router-dom";
import { routes } from "../../Consts/routes.ts";
import styles from "../SearchInput/select.module.css"

const SearchInput: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
    const [roadmaps, setRoadmaps] = useState<RoadmapPaged[]>([]);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [value, setValue] = useState<string>();
    const navigate = useNavigate();

    const handleSearch = async (newValue: string) => {
        if (!newValue) {
            setRoadmaps([]);
            setUsers([]);
            return;
        }

        try {
            const [roadmapsResponse, usersResponse] = await Promise.all([
                getRoadmaps(newValue),
                getUsers(newValue)
            ]);

            if (roadmapsResponse.roadmaps) setRoadmaps(roadmapsResponse.roadmaps);
            if (usersResponse) setUsers(usersResponse);
            console.log(users);
            console.log(roadmaps);
        } catch (error) {
            console.error('Error fetching search data:', error);
        }
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleSelect = (value: string, option: any) => {
        if (option.type === 'roadmap') {
            // Add your roadmap-specific action here.
        } else if (option.type === 'user') {
            navigate(routes.usersRoadmaps(value));
        }
    };

    const options = [
        ...(roadmaps.length > 0 ? [{
            label: <span>Роадмапы</span>,
            options: roadmaps.map((roadmap) => ({
                value: roadmap.id,
                label: roadmap.name,
                type: 'roadmap',
            })),
        }] : []),
        ...(users.length > 0 ? [{
            label: <span>Пользователи</span>,
            options: users.map((user) => ({
                value: user.username,
                label: user.username,
                type: 'user',
            })),
        }] : []),
    ];

    return (
        <Select
            className={styles.ellipsissSelect}
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            onSelect={handleSelect}
            notFoundContent={<Empty />}
            options={options}
        />
    );
};

export default SearchInput;
