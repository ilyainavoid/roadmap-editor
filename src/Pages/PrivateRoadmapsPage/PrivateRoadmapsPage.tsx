import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Empty, Flex, FloatButton, Pagination, Typography} from 'antd';
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import {getPrivateRoadmaps} from "../../API/Roadmaps/getPrivateRoadmaps.ts";

const {Title} = Typography;

const PrivateRoadmapsPage: React.FC = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [total, setTotal] = useState(0);

    const page = parseInt(searchParams.get('page') || '1', 10);

    const [currentPage, setCurrentPage] = useState(page);

    const fetchData = async (page: number) => {
        let response = await getPrivateRoadmaps(page);
        if (response) {
            setRoadmaps(response.roadmaps);
            setTotal(response.pagination?.count);
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        setCurrentPage(page);
        fetchData(page)
    }, [page]);

    const handlePageChange = (page: number) => {

        setSearchParams({page: page.toString()});

    };

    return (
        <>
            <Flex className="container" vertical>
                <Title level={1}>Доступные роадмапы</Title>
                {
                    roadmaps.length > 0 ?
                        (<ListOfRoadmaps roadmaps={roadmaps}/>)
                        : (<Empty/>)}
                {total > 0 && (
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

export default PrivateRoadmapsPage;
