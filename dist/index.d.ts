import { Atom } from 'data0';
import { BrowserHistory } from 'history';
import { createBrowserHistory } from 'history';
import { createHashHistory } from 'history';
import { createMemoryHistory } from 'history';
import { ManualCleanup } from 'data0';
import { RxSet } from 'data0';

export { createBrowserHistory }

export { createHashHistory }

export { createMemoryHistory }

export declare type InputRouteData<T> = {
    path: string;
    handler?: T;
    exact?: boolean;
    redirect?: string | [string, true];
    strict?: boolean;
};

declare type Params = {
    [k: string]: any;
};

declare type RouteMatchResult = {
    handler?: any;
    path?: string;
    isExactMatch?: boolean;
    matchPath?: string;
    params?: RouteParams;
    searchParams: Params;
    redirect?: string | [string, true];
};

declare type RouteNode<T> = {
    children: Map<string, RouteNode<T>>;
    dynamicChildren?: {
        paramName: string;
        node: RouteNode<T>;
    };
    handler?: T;
    redirect?: string | [string, true];
    strictHandler: any;
};

declare type RouteParams = {
    [k: string]: any;
};

export declare class Router<T> extends ManualCleanup {
    data: InputRouteData<T>[];
    history: BrowserHistory;
    parentPath: string;
    parent?: Router<T> | undefined;
    pathname: Atom<string>;
    handler: Atom<T | undefined>;
    params: Atom<{
        [k: string]: any;
    }>;
    searchParams: Atom<Params>;
    path: Atom<string>;
    children: RxSet<Router<T>>;
    map: RouteNode<T>;
    unlisten: () => void;
    constructor(data: InputRouteData<T>[], history?: BrowserHistory, parentPath?: string, parent?: Router<T> | undefined);
    destroy(): void;
    addOne(data: InputRouteData<T>): void;
    add(data: InputRouteData<T>[]): void;
    recognize(inputPath: string): RouteMatchResult;
    onHistoryChange: () => void;
    redirect(absolutePath: string, reload?: boolean): void;
    push(path: string, reload?: boolean): void;
    updateSearchParams(newParams: Record<string, string | undefined>): void;
    derive(path?: string): {
        new (data: InputRouteData<T>[], subParentPath?: string): {
            data: InputRouteData<T>[];
            subParentPath: string;
            pathname: Atom<string>;
            handler: Atom<T | undefined>;
            params: Atom<{
                [k: string]: any;
            }>;
            searchParams: Atom<Params>;
            path: Atom<string>;
            children: RxSet<Router<T>>;
            map: RouteNode<T>;
            unlisten: () => void;
            history: BrowserHistory;
            parentPath: string;
            parent?: Router<T> | undefined;
            destroy(): void;
            addOne(data: InputRouteData<T>): void;
            add(data: InputRouteData<T>[]): void;
            recognize(inputPath: string): RouteMatchResult;
            onHistoryChange: () => void;
            redirect(absolutePath: string, reload?: boolean): void;
            push(path: string, reload?: boolean): void;
            updateSearchParams(newParams: Record<string, string | undefined>): void;
            derive(path?: string): {
                new (data: InputRouteData<T>[], subParentPath?: string): /*elided*/ any;
                collectFrames: ManualCleanup[][];
                collectEffect(): () => ManualCleanup[];
            };
        };
        collectFrames: ManualCleanup[][];
        collectEffect(): () => ManualCleanup[];
    };
}

export { }
