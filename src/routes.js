import SplashScreen from './SplashScreen.vue';
import { SetupLayout, SetupNameScreen, SetupAgeScreen } from './setup';
import MainMenuScreen from './MainMenuScreen.vue';
import PlayScreen from './PlayScreen.vue';
import TutorialScreen from './TutorialScreen.vue';
import SettingsScreen from './SettingsScreen.vue';
import CreditsScreen from './CreditsScreen.vue';

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
    },
    {
        path: '/play',
        name: 'PlayScreen',
        component: PlayScreen,
        meta: {
            order: 4
        }
    },
    {
        path: '/tutorial',
        name: 'TutorialScreen',
        component: TutorialScreen,
        meta: {
            order: 4
        }
    },
    {
        path: '/settings',
        name: 'SettingsScreen',
        component: SettingsScreen,
        meta: {
            order: 4
        }
    },
    {
        path: '/credits',
        name: 'CreditsScreen',
        component: CreditsScreen,
        meta: {
            order: 4
        }
    },
];