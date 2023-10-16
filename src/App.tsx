import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {Tenders} from './pages/tenders';
import {APP_URLS} from './constants/urls/urls.constants';

const router = createBrowserRouter([
    {
        path: APP_URLS.TENDERS,
        element: <Tenders />,
    },
]);

export function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}
