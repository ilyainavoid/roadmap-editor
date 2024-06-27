import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Space, Button, Flex, Input, Pagination, Typography, Empty, FloatButton} from 'antd';
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import {SearchOutlined} from "@ant-design/icons";
import {getRoadmaps} from "../../API/Roadmaps/getRoadmaps.ts";

const {Title} = Typography;

const PublicRoadmapPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [total, setTotal] = useState(0);
    const [roadmaps, setRoadmaps] = useState([]);


    const name = searchParams.get('name') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const [searchValue, setSearchValue] = useState(name);
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        setSearchValue(name);
        setCurrentPage(page);
        fetchData(name, page)
    }, [name, page]);

    const fetchData = async (name: string, page: number) => {
        let response = await getRoadmaps(name, page)
        if (response.roadmaps) {
            setTotal(response.pagination.count);
            setRoadmaps(response.roadmaps);
        } else {
            console.log("error")
        }
    }


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
                <Title level={1}>Публичные роадмапы</Title>
                <Flex className={"search-container"}>
                    <Space.Compact style={{width: '100%'}}>
                        <Input addonBefore={<SearchOutlined/>}
                               placeholder="Найти роадмап по названию"
                               value={searchValue}
                               onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button onClick={handleSearch}>Искать</Button>
                    </Space.Compact>
                </Flex>
                {
                    roadmaps.length > 0 ?
                        (<ListOfRoadmaps roadmaps={roadmaps}/>)
                        : (<Empty/>)}
                {total > 1 && (
                    <Pagination className={"pagination-container"}
                                current={currentPage}
                                onChange={handlePageChange}
                                total={total}
                    />
                )}
            </Flex>
            <FloatButton.BackTop />
        </>
    );
};

export default PublicRoadmapPage;
