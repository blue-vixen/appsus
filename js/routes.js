import appHome from './pages/app-home.cmp.js'
import appsPage from './pages/app-home.cmp.js'
import keepApp from './apps/keep/pages/note-app.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'
// import bookDetails from './pages/book-details.cmp.js'
// import bookAdd from './pages/book-add.cmp.js'



const routes = [
    {
        path: '/',
        component: appHome
    },

    {
        path: '/apps',
        component: appsPage,
    },
    {
        path: '/apps/keep',
        component: keepApp
    },
    {
        path: '/apps/mail',
        component: mailApp
    },

    {
        path: '/mail/:mailId',
        component: mailDetails
    },
    // {
    //     path: '/addbook',
    //     component: bookAdd
    // }
    // {
    //     path: '/about',
    //     component: aboutPage,
    //     children: [
    //         {
    //             path: 'books',
    //             component: aboutBooks
    //         },
    //         {
    //             path: 'us',
    //             component: aboutUs
    //         }
    //     ]

    // },
];

export const router = new VueRouter({ routes });