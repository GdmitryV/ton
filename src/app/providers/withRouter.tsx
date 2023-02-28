import React, {FC, Suspense} from 'react';
import {BrowserRouter} from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () => {
    return (
        <BrowserRouter>
            <Suspense fallback={'Loading...'}>//todo сделать лоадер
                {component()}
            </Suspense>
        </BrowserRouter>
    );
};
