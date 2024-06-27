export const routes = {
    root: () => '/',
    login: () => '/login',
    registration: () => '/registration',
    profile: () => '/profile',
    roadmap: () => '/roadmap/:mode/:id',
    error: () => '/error',
    creatediagram: () => '/create',
    edit: () => '/edit',
    roadmaps: () => '/roadmaps',
    myRoadmaps: () => '/roadmaps/my',
    stared: () => '/roadmaps/stared',
    private: () => '/roadmaps/private',
    usersRoadmaps: (username: string) => `/users/${username || ':username'}/roadmaps`
};
