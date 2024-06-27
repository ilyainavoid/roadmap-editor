import React, {useState} from "react";
import {Card, Col, Row, Space, Typography, Progress, Dropdown, MenuProps} from "antd";
import styles from './card.module.css';
import {StarFilled, StarOutlined, UserOutlined, EllipsisOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {RootState} from "../../Redux/rootReducer";
import {useNavigate} from "react-router-dom";
import {Status} from "../../Consts/statuses";
import {routes} from "../../Consts/routes";
import {postStarRoadmap} from "../../API/Roadmaps/postStarRoadmap.ts";
import {postRoadmapCopy} from "../../API/Roadmaps/postRoadmapCopy.ts";
import EditRoadmapModal from "../Modals/EditRoadmapModal.tsx";
import {putRoadmapEdit} from "../../API/Roadmaps/putRoadmapEdit.ts";
import DeleteRoadmapModal from "../Modals/DeleteRoadmapModal.tsx";
import {deleteRoadmap} from "../../API/Roadmaps/deleteRoadmap.ts";

const {Text, Title} = Typography;

interface RoadmapCardProps {
    roadmap: RoadmapPaged;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({roadmap}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isStared, setIsStared] = useState<boolean>(roadmap.isStared);
    const [starsCount, setStarsCount] = useState<number>(roadmap.starsCount);
    const [name, setName] = useState<string>(roadmap.name);
    const [description, setDescription] = useState<string>(roadmap.description);
    const navigate = useNavigate();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const profile = useSelector((state: RootState) => state.profile.profile);

    const progressPercent = parseInt(((roadmap.topicsClosed / roadmap.topicCount) * 100).toFixed(0), 10);

    const handleStarClick = async (event: React.MouseEvent) => {
        if (isAuth && profile?.id !== roadmap.user.id) {
            event.stopPropagation();
            let response = await postStarRoadmap(roadmap.id);
            if (response === 200) {
                setIsStared(true);
                setStarsCount(starsCount + 1);
            }
        }
    };

    const handleUnstarClick = async (event: React.MouseEvent) => {
        if (isAuth && profile?.id !== roadmap.user.id) {
            event.stopPropagation();
            let response = await postStarRoadmap(roadmap.id);
            if (response === 200) {
                setIsStared(false);
                setStarsCount(starsCount - 1);
            }
        }
    };

    const handleCardClick = () => {
        navigate(routes.roadmap('view', roadmap.id))
        console.log("Navigate to roadmap details");
    };

    const handleAuthorClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (roadmap.user.id !== profile?.id) {
            navigate(routes.usersRoadmaps(roadmap.user.username))
        }
        else navigate(routes.myRoadmaps())

    };

    const handleCopyClick = async (event: React.MouseEvent) => {
        event.stopPropagation();
        let response = await postRoadmapCopy(roadmap.id);
        if (response) {
            //todo: redirect
        } else {
            console.log("error");
        }
    };

    const handleEditClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsEditOpen(true);
    };

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDeleteOpen(true);
    };

    const handleEditCancelClick = () => {
        setIsEditOpen(false);
    };

    const handleDeleteCancelClick = () => {
        setIsDeleteOpen(false);
    }

    const handleEditSubmit = async (values: RoadmapCreate) => {
        let response = await putRoadmapEdit(roadmap.id, values);
        if (response?.status === 200) {
            setIsEditOpen(false);
            setName(values.name);
            setDescription(values.description);
        } else {
            console.log("error");
        }
    };

    const handleDeleteOnSubmit = async () => {
        let response = await deleteRoadmap(roadmap.id);
        if (response?.status === 200) {
            setIsDeleteOpen(false);
        } else console.log("error");
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Копировать',
            onClick: (e) => {
                handleCopyClick(e.domEvent);
            },
        }
    ];

    if (roadmap.user.id === profile?.id) {
        items.push(
            {
                key: '2',
                label: 'Редактировать',
                onClick: (e) => {
                    handleEditClick(e.domEvent);
                },
            },
            {
                key: '3',
                label: 'Удалить',
                danger: true,
                onClick: (e) => {
                    handleDeleteClick(e.domEvent)
                },
            }
        );
    }

    return (
        <>
            <Card hoverable className={styles.roadmapCard} onClick={handleCardClick}>
                <Row justify="space-between" align="middle">
                    <Title level={4} ellipsis>
                        {name}
                    </Title>
                    {(roadmap.status === Status.Public || roadmap.user.id === profile?.id) && (
                        <Dropdown menu={{items}} trigger={['click']}>
                            <EllipsisOutlined className={styles.ellipsisMenu} onClick={e => e.stopPropagation()}/>
                        </Dropdown>
                    )}
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={18}>
                        <Text ellipsis>{description}</Text>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <Space direction="vertical">
                            <Space className={styles.userContainer} onClick={handleAuthorClick}>
                                <Text ellipsis className={styles.user}><UserOutlined/> {roadmap.user.username}</Text>
                            </Space>
                            <Space>
                                {
                                    (roadmap.status !== Status.Private && roadmap.status !== Status.PrivateSharing) && (
                                        isStared ? (
                                            <>
                                                <StarFilled className="star" onClick={handleUnstarClick}/>
                                                <Text>{starsCount}</Text>
                                            </>
                                        ) : (
                                            <>
                                                <StarOutlined className="unstar" onClick={handleStarClick}/>
                                                <Text>{starsCount}</Text>
                                            </>
                                        )
                                    )
                                }
                            </Space>
                        </Space>
                    </Col>
                </Row>
                {(isAuth && progressPercent > 0) && (<Progress percent={progressPercent}/>)}
            </Card>
            <EditRoadmapModal isOpen={isEditOpen} onCancel={handleEditCancelClick} onSubmit={handleEditSubmit}
                              name={roadmap.name} description={roadmap.description}/>
            <DeleteRoadmapModal isOpen={isDeleteOpen} onCancel={handleDeleteCancelClick} onSubmit={handleDeleteOnSubmit}
                                name={name}/>
        </>
    );
};

export default RoadmapCard;
