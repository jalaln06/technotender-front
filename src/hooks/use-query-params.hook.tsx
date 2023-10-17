import {useLocation, useNavigate} from 'react-router-dom';
import {useMemo} from 'react';

export interface QueryParam {
    name: string;
    value: string;
}

export interface QueryOptions {
    action?: 'push' | 'replace';
}

export const useQueryParams = () => {
    const navigate = useNavigate();
    const {search, pathname} = useLocation();

    const query = useMemo(() => new URLSearchParams(search), [search]);

    const setPath = (newQuery: URLSearchParams, options = {} as QueryOptions) => {
        const {action = 'push'} = options;

        if (action === 'push') navigate({pathname, search: newQuery.toString()});
        else navigate({pathname, search: newQuery.toString()}, {replace: true});
    };

    const updateQueryParams = (params: QueryParam[], options?: QueryOptions) => {
        params.forEach(({name, value}) => {
            query.set(name, value);
        });
        setPath(query, options);
    };

    const removeQueryParams = (params: string[], options?: QueryOptions) => {
        params.forEach(param => query.delete(param));
        setPath(query, options);
    };

    const getQueryParams = <ParamNames extends string, >(
        params: ParamNames[],
    ): Record<ParamNames, string | null> => params.reduce((acc, param) => {
            acc[param] = query.get(param);
            return acc;
        }, {} as Record<ParamNames, string | null>);

    const getQueryParam = (name: string) => {
        const param = query.get(name);
        return param;
    };

    return {
        query,
        updateQueryParams,
        removeQueryParams,
        getQueryParams,
        getQueryParam,
    };
};
