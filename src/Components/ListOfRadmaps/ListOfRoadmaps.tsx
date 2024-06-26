import React from "react";
import styles from "./list.module.css";
import {Col, Row} from "antd";
import RoadmapCard from "../RoadmapCard/RoadmapCard.tsx";


const roadmapExamples: RoadmapPaged[] = [
    {
        id: 'roadmap-1',
        name: 'Roadmap 1 Roadmap 1 Roadmap 1 Roadmap 1',
        description: ' Description of Roadmap 1 Description of Roadmap 1 Description of Roadmap 1 v Description of Roadmap 1 v v Description of Roadmap 1 v v v v v Description of Roadmap 1 Description of Roadmap 1 Description of Roadmap 1 Description of Roadmap 1 ',
        user: {
            id: 'user-1',
            email: 'user1@example.com',
            username: 'user1 user1 user1 user1'
        },
/*
        status: Status.Public,
*/
        starsCount: 42,
        topicCount: 10,
        topicsClosed: 10,
        isStared: true
    },
    {
        id: 'roadmap-2',
        name: 'Roadmap 2',
        description: 'Description of Roadmap 2',
        user: {
            id: 'user-2',
            email: 'user2@example.com',
            username: 'user2'
        },
/*
        status: Status.Private,
*/
        starsCount: 35,
        topicCount: 20,
        topicsClosed: 15,
        isStared: false
    },
    {
        id: 'roadmap-3',
        name: 'Roadmap 3',
        description: 'Description of Roadmap 3',
        user: {
            id: 'user-3',
            email: 'user3@example.com',
            username: 'user3'
        },
/*
        status: Status.PrivateSharing,
*/
        starsCount: 27,
        topicCount: 30,
        topicsClosed: 25,
        isStared: true
    },
    {
        id: 'roadmap-4',
        name: 'Roadmap 4',
        description: 'Description of Roadmap 4',
        user: {
            id: 'user-4',
            email: 'user4@example.com',
            username: 'user4'
        },
/*
        status: Status.Public,
*/
        starsCount: 58,
        topicCount: 40,
        topicsClosed: 35,
        isStared: false
    },
    {
        id: 'roadmap-5',
        name: 'Roadmap 5',
        description: 'Description of Roadmap 5',
        user: {
            id: 'user-5',
            email: 'user5@example.com',
            username: 'user5'
        },
        /*
                status: Status.Public,
        */
        starsCount: 58,
        topicCount: 40,
        topicsClosed: 35,
        isStared: false
    }
];

const ListOfRoadmaps: React.FC = () => {
    return (
        <>
            <div className={styles.container}>
                <Row gutter={16}>
                    {roadmapExamples.map((roadmap, index) => (
                        <Col key={index} xs={24} sm={24} md={12} lg={12}
                            style={{marginBottom: 16}}
                        >
                            <RoadmapCard roadmap={roadmap}/>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default ListOfRoadmaps;