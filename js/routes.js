import appHome from './pages/app-home.cmp.js'
import appsPage from './pages/app-home.cmp.js'
import keepApp from './apps/keep/pages/note-index.cmp.js'
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
        children: [
        {
            path: 'keep',
            component: keepApp
        }
        ]
    },
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
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },
    // {
    //     path: '/addbook',
    //     component: bookAdd
    // }
];

export const router = new VueRouter({ routes });