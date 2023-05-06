import Home from '~/pages/Home'
//Layouts
import { HeaderOnly } from '~/components/Layout'

import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Search from '~/pages/Search'

//Authentication not required
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/following',
        component: Following,
    },
    {
        path: `/:nickname`,
        component: Profile,
    },
    {
        path: '/upload',
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: '/search',
        component: Search,
        layout: null,
    },
]

// Authentication required
const privateRoutes = []

export { publicRoutes, privateRoutes }
