export const routes = {
    root: () => '/',
    login: () => '/login',
    registration: () => '/registration',
    profile: () => '/profile',
    roadmap: (mode: string) => `/roadmap/${mode}`,
    edit: () => '/edit'
}