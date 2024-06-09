import {routes} from "./routes.ts";

interface MenuRoutes {
    [key: string]: string;
}

export const menuRoutes: MenuRoutes = {
    main: routes.root(),
    login: routes.login(),
};
