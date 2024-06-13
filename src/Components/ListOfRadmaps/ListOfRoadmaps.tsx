import React from "react";
import styles from "./list.module.css";
import {Col, Row} from "antd";
import RoadmapCard from "../RoadmapCard/RoadmapCard.tsx";


export const roadmaps = [
    {
        title: 'Roadmap 1',
        description: 'Description of Roadmap 1',
        author: 'Author 1',
        likes: 42,
    },
    {
        title: 'Roadmap 2',
        description: 'Description of Roadmap 2',
        author: 'Author 2',
        likes: 35,
    },
    {
        title: 'Roadmap 3',
        description: 'Description of Roadmap 3',
        author: 'Author 3',
        likes: 27,
    },
    {
        title: 'Roadmap 4',
        description: 'Description of Roadmap 4',
        author: 'Author 4',
        likes: 58,
    },
];

const ListOfRoadmaps: React.FC = () => {
    return (
        <>
            <div className={styles.container}>
                <Row gutter={16}>
                    {roadmaps.map((roadmap, index) => (
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