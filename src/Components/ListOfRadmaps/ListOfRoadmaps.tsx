import React from "react";
import styles from "./list.module.css";
import {Col, Row} from "antd";
import RoadmapCard from "../RoadmapCard/RoadmapCard.tsx";


interface ListOfRoadmapsPageProps {
    roadmaps: RoadmapPaged[];
}

const ListOfRoadmaps: React.FC<ListOfRoadmapsPageProps> = ({roadmaps}) => {
    return (
        <>
            <div className={styles.container}>
                <Row gutter={16}>
                    {roadmaps && roadmaps.map((roadmap, index) => (
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