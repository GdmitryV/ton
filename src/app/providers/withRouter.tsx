import React, {FC, Suspense} from 'react';
import {BrowserRouter} from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () => {
    //todo сделать лоадер
    return (
        <BrowserRouter>
            <Suspense fallback={'Loading...'}>
                {component()}
            </Suspense>
        </BrowserRouter>
    );
};
