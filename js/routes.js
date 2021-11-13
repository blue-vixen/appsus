import appHome from './pages/app-home.cmp.js'
import appAbout from './pages/app-about.cmp.js'
import appsPage from './pages/app-home.cmp.js'
import keepApp from './apps/keep/pages/note-app.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import bookApp from './apps/books/pages/book-app.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'
import mailEdit from './apps/mail/pages/mail-edit.cmp.js'
import bookAdd from './apps/books/pages/book-add.cmp.js'
import bookDetails from './apps/books/pages/book-details.cmp.js'



const routes = [
    {
        path: '/',
        component: appHome
    },
    {
        path: '/about',
        component: appAbout
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
        path: '/apps/books',
        component: bookApp
    },
    {
        path: '/mail/compose',
        component: mailEdit
    },
    {
        path: '/mail/:mailId',
        component: mailDetails
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/addbook',
        component: bookAdd
    }

];

export const router = new VueRouter({ routes });