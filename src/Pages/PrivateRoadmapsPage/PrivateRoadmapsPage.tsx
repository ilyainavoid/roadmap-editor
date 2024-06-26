import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Flex, Pagination, Typography} from 'antd';
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";

const {Title} = Typography;

const PrivateRoadmapsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [total, SetTotal] = useState(50);

    const page = parseInt(searchParams.get('page') || '1', 10);

    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const handlePageChange = (page: number) => {

        setSearchParams({page: page.toString()});

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
