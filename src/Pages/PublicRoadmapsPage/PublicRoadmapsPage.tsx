import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Space, Button, Flex, Input, Pagination, Typography} from 'antd';
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import {SearchOutlined} from "@ant-design/icons";

const {Title} = Typography;

const PublicRoadmapPage: React.FC = () => {
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
                <Title level={1}>Отмеченнеы роадмапы</Title>
                <Flex className={"search-container"}>
                    <Space.Compact style={{width: '100%'}}>
                        <Input addonBefore={<SearchOutlined />}
                            placeholder="Найти роадмап по названию"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button onClick={handleSearch}>Искать</Button>
                    </Space.Compact>
                </Flex>
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

export default PublicRoadmapPage;
