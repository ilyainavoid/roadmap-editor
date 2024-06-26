import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Space, Button, Flex, Input, Pagination, Typography} from 'antd';
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import {SearchOutlined} from "@ant-design/icons";

const {Title} = Typography;

const PrivateRoadmapsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [total, SetTotal] = useState(50);

    const name = searchParams.get('name') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const [searchValue, setSearchValue] = useState(name);
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        setSearchValue(name);
        setCurrentPage(page);
    }, [name, page]);

    const handleSearch = () => {
        setSearchParams({name: searchValue, page: '1'});
    };

    const handlePageChange = (page: number) => {
        if (searchValue != "") {
            setSearchParams({name: searchValue, page: page.toString()});
        } else {
            setSearchParams({page: page.toString()});
        }

    };

    return (
        <>
            <Flex className="container" vertical>
                <Title level={1}>Доступные роадмапы</Title>
                <ListOfRoadmaps/>
                {total > 0 && (
                    <Pagination className={"pagination-container"}
                                current={currentPage}
                                onChange={handlePageChange}
                                total={total}
                    />
                )}
            </Flex>
        </>
    );
};

export default PrivateRoadmapsPage;
