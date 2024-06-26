import {RouterProvider} from "react-router-dom";
import {router} from "./Router.tsx";
import React from "react";

const App: React.FC = () => {
    return (<RouterProvider router={router}/>)
}

export default App
