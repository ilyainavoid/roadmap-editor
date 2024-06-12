import React from "react";
import {Flex} from "antd";
import ProfileCard from "../../Components/ProfileCard/ProfileCard.tsx";

const ProfilePage : React.FC = () => {
    return(
        <>
            <Flex className={"container"}>
                <ProfileCard></ProfileCard>
            </Flex>
        </>
    )
}

export default ProfilePage;