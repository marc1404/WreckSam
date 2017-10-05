import SplashScreen from './SplashScreen.vue';
import { SetupLayout, SetupNameScreen, SetupAgeScreen } from './setup';
import MainMenuScreen from './MainMenuScreen.vue';

export default [
    {
        path: '/splash',
        name: 'SplashScreen',
        component: SplashScreen,
        meta: {
            order: 0
        }
    },
    {
        path: '/setup',
        component: SetupLayout,
        children: [
            {
                path: '/name',
                name: 'SetupNameScreen',
                component: SetupNameScreen,
                meta: {
                    order: 1
                }
            },
            {
                path: '/age',
                name: 'SetupAgeScreen',
                component: SetupAgeScreen,
                meta: {
                    order: 2
                }
            }
        ],
    },
    {
        path: '/main',
        name: 'MainMenuScreen',
        component: MainMenuScreen,
        meta: {
            order: 3
        }
    }
];