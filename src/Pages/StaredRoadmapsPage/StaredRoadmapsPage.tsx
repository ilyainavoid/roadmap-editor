import {Empty, Flex, Pagination, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import {getStaredRoadmaps} from "../../API/Roadmaps/getStaredRoadmaps.ts";

const {Title} = Typography;

const StaredRoadmapsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [roadmaps, setRoadmaps] = useState([]);
    const [total, setTotal] = useState(0);

    const page = parseInt(searchParams.get('page') || '1', 10);

    const [currentPage, setCurrentPage] = useState(page);

    const fetchData = async (page: number) => {
        let response = await getStaredRoadmaps(page);
        if (response) {
            setRoadmaps(response.roadmaps);
            setTotal(response.pagination?.count);
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        fetchData(page)
        setCurrentPage(page);
    }, [page]);


    const handlePageChange = (page: number) => {
        setSearchParams({page: page.toString()});
    };

    return (
        <>
            <Flex className="container" vertical>
                <Title level={1}>Отмеченные роадмапы</Title>
                {(roadmaps && roadmaps.length > 0) ?
                        (<ListOfRoadmaps roadmaps={roadmaps}/>)
                        : (<Empty/>) }
                {(total > 1) && (
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

export default StaredRoadmapsPage;