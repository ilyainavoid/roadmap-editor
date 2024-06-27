import React, {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Button, Flex, FloatButton, Pagination, Space, Typography} from 'antd';
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import {getMyRoadmaps} from "../../API/Roadmaps/getMyRoadmaps.ts";
import {NO_ROADMAPS_YET} from "../../Consts/strings.ts";
import CreateRoadmapModal from "../../Components/Modals/CreateRoadmapModal.tsx";
import {postRoadmapCreate} from "../../API/Roadmaps/postRoadmapCreate.ts";
import {routes} from "../../Consts/routes.ts";

const {Title} = Typography;

const MyRoadmapsPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [roadmaps, setRoadmaps] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const page = parseInt(searchParams.get('page') || '1', 10);

    const [currentPage, setCurrentPage] = useState(page);

    const fetchData = async (page: number) => {
        let response = await getMyRoadmaps(page);
        if (response.roadmaps) {
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

    const handleCancel = () => {
        setIsOpen(false);
    }

    const handleCreate = async (data: RoadmapCreate) => {
        let response = await postRoadmapCreate(data)
        if (response) {
            setIsOpen(false)
            navigate(routes.roadmap('edit', response))
        } else {
            console.log("error")
        }
    }

    return (
        <>
            <Flex className="container" vertical>
                <Title level={1}>Мои роадмапы</Title>
                {roadmaps && roadmaps.length > 0 ? (<ListOfRoadmaps roadmaps={roadmaps}/>) :
                    (
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh'}}>
                            <Space direction="vertical" style={{textAlign: 'center', width: '100%'}}>
                                <Title level={1} style={{fontSize: '24px'}}>
                                    {NO_ROADMAPS_YET[0]}
                                </Title>
                                <Title level={1} style={{fontSize: '24px'}}>
                                    {NO_ROADMAPS_YET[1]}
                                </Title>
                                <Button onClick={() => setIsOpen(true)} style={{marginTop: "20px"}} size={"large"}
                                        type="primary">Создать</Button>
                            </Space>
                        </div>
                    )
                }

                {total > 1 && (
                    <Pagination className={"pagination-container"}
                                current={currentPage}
                                onChange={handlePageChange}
                                total={total}
                    />
                )}
            </Flex>
            <FloatButton.BackTop />
            <CreateRoadmapModal isOpen={isOpen} onCancel={handleCancel} onSubmit={handleCreate}/>
        </>
    );
};

export default MyRoadmapsPage;
