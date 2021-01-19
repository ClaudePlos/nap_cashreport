import { Commands, Context, Route, Router } from '@vaadin/router';

import './views/main/main-view';
import './views/login/login-view';
import './views/cashregister/cash-register-view';
import { handleAuthentication, isAuthenticated, signOut } from './auth';

const authGuard = async (context: Context, commands: Commands) => {
    if (!(await isAuthenticated())) {
        // Save requested path
        sessionStorage.setItem('login-redirect-path', context.pathname);
        return commands.redirect('/login');
    }
    return undefined;
};

const routes: Route[] = [
    { path: '/login', component: 'login-view' },
    {
        path: '/callback',
        action: async (_: Context, commands: Commands) => {
            if (await handleAuthentication()) {
                return commands.redirect(
                    sessionStorage.getItem('login-redirect-path') || '/'
                );
            } else {
                return commands.redirect('/login?error');
            }
        },
    },
    {
        path: '/logout',
        action: async (_: Context, commands: Commands) => {
            signOut();
            location.reload();
            return commands.prevent();
        },
    },
    {
        path: '',
        component: 'main-view',
        action: authGuard, // Require a logged in user to access
        children: [
            {   path: '',
                component: 'about-view',
                action: async () => {
                    await import('./views/about/about-view');
                },
            },
            {
                path: 'about',
                component: 'about-view',
                action: async () => {
                    await import('./views/about/about-view');
                },
            },
            {   path: 'cash-register',
                component: 'cash-register-view',
                action: async () => {
                    await import('./views/cashregister/cash-register-view');
                },
            },
            {
                path: 'master-detail',
                component: 'master-detail-view',
                action: async () => {
                    await import('./views/masterdetail/master-detail-view');
                },
            },
        ],
    },
];

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);