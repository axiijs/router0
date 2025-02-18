import {createBrowserHistory} from "history";
import {atom, Atom,  ManualCleanup, RxSet} from "data0";

export type InputRouteData<T> = {
    path: string,
    handler?: T,
    exact?: boolean,
    // CAUTION 使用 redirect 的  route 一定是 exact match
    redirect?: string|[string, true],
    strict?: boolean
}


type RouteNode<T> = {
    children: Map<string, RouteNode<T>>,
    // 只能有一个 dynamic param name。
    dynamicChildren?: {
        paramName: string,
        node: RouteNode<T>
    },
    handler?: T,
    redirect?: string|[string, true],
    strictHandler: any
}
type Params = { [k: string]: any }
type RouteParams = {[k: string]: any}
type RouteMatchResult = {
    handler?: any,
    path?: string,
    isExactMatch?:boolean,
    matchPath?: string,
    params?: RouteParams,
    searchParams: Params
    redirect? : string| [string, true]
}

// strict 是用来处理既有参数，又有精确匹配的场景的，例如 /project/:id  和 /project/new
//  优先精确匹配。
export class Router<T> extends ManualCleanup{
    public pathname:Atom<string> = atom('');
    public handler: Atom<T|undefined> = atom(undefined);
    public params: Atom<{[k: string]: any}> = atom({});
    public searchParams: Atom<Params> = atom({})
    public path: Atom<string> = atom('');
    public children: RxSet<Router<T>> = new RxSet([])
    public map: RouteNode<T> = {
        children: new Map<string, RouteNode<T>>(),
        handler: undefined,
        redirect: undefined,
        strictHandler: undefined
    }
    private unlisten: () => void
    constructor(
        public data: InputRouteData<T>[],
        public history = createBrowserHistory(),
        public parentPath: string = '',
        public parent?: Router<T>
    ) {
        super()
        data.forEach(i => this.addOne(i))

        this.unlisten = this.history.listen(this.onHistoryChange)
        this.onHistoryChange()
        if (this.parent) {
            this.parent.children.add(this)
        }
    }
    destroy() {
        this.unlisten()
        this.parent?.children.delete(this)
    }
    addOne(data: InputRouteData<T>) {
        const pathArr = data.path.split('/').filter(Boolean)
        let routeNode = this.map
        pathArr.forEach((frag) => {
            if (frag.startsWith(':')) {
                if (routeNode.dynamicChildren) {
                    throw new Error('only one dynamic param is allowed')
                }

                routeNode.dynamicChildren = {
                    paramName: frag.slice(1),
                    node: {
                        children: new Map<string, RouteNode<T>>(),
                        handler: undefined,
                        strictHandler: undefined
                    }
                }
                routeNode = routeNode.dynamicChildren.node
            } else {
                const children = routeNode.children
                routeNode = children.get(frag)!
                if (!routeNode) {
                    children.set(
                        frag,
                        (routeNode = {
                            children: new Map<string, RouteNode<T>>(),
                            handler: undefined,
                            strictHandler: undefined
                        })
                    )
                }
            }
        })

        if (data.strict) {
            routeNode.strictHandler = data.handler
        } else {
            routeNode.handler = data.handler
        }
        routeNode.redirect = data.redirect
    }
    add(data: InputRouteData<T>[]) {
        data.forEach(d => this.addOne(d))
        this.onHistoryChange()
    }
    recognize(inputPath: string): RouteMatchResult {
        const relativePath = inputPath.startsWith(this.parentPath)
            ? inputPath.slice(this.parentPath.length)
            : inputPath
        const inputPathArr = relativePath.split('/').filter(Boolean)
        let pointer: RouteNode<T> = this.map
        const resultPathArr: string[] = []
        const matchedPathArr: string[] = []
        const params: { [k: string]: any } = {}
        const searchParams: { [key: string]: string } = {}
        let isExactMatch = true
        // 1. 优先使用 children 匹配
        for (let frag of inputPathArr) {
            const strictNode = pointer.children.get(frag)
            if (strictNode) {
                resultPathArr.push(frag)
                matchedPathArr.push(frag)
                pointer = strictNode
            } else if (pointer.dynamicChildren) {
                params[pointer.dynamicChildren.paramName] = frag
                resultPathArr.push(pointer.dynamicChildren.paramName)
                matchedPathArr.push(frag)
                pointer = pointer.dynamicChildren.node
            } else {
                isExactMatch = false
                break
            }
        }

        const search = new URLSearchParams(this.history.location.search)
        for (const [key, value] of search) {
            searchParams[key] = value
        }

        return {
            handler: pointer.handler || pointer.strictHandler,
            redirect: pointer.redirect,
            params,
            searchParams,
            isExactMatch,
            path: `/${resultPathArr.join('/')}`,
            matchPath: `/${matchedPathArr.join('/')}`
        }
    }
    onHistoryChange = () => {
        this.pathname(this.history.location.pathname)
        const result = this.recognize(this.history.location.pathname)
        this.handler(result.handler)
        this.path(result.path)
        this.params(result.params)
        this.searchParams(result.searchParams)

        // CAUTION 使用 redirect 的 route 一定是 exact match
        if (result.redirect && result.isExactMatch) {
            const [redirectPath, reload] = Array.isArray(result.redirect)
                ? result.redirect
                : [result.redirect, false]
            this.push(redirectPath, reload)
        }
    }

    redirect(absolutePath: string, reload = false) {
        if (reload) {
            window.location.href = absolutePath
        } else {
            this.history.push(absolutePath)
        }
    }
    push(path: string, reload = false) {
        // push 默认是到当前 router 的 root path 下，要接上 parentPath。
        // 也可以使用 `//` 来强行到所有 router 的 root path 下。
        if (path.startsWith('//')) {
            return this.redirect(path.slice(1), reload)
        }

        if (reload) {
            window.location.href = `${this.parentPath}${path}`
        } else {
            this.history.push(`${this.parentPath}${path}`)
        }
    }

    updateSearchParams(newParams: Record<string, string | undefined>) {
        // 使用 History API 更新 URL,而不是使用 rxRouter.replace
        const newUrl = new URL(window.location.href)
        const currentParams = { ...this.searchParams.raw }

        Object.entries(newParams).forEach(([key, value]) => {
            if (value === undefined) {
                newUrl.searchParams.delete(key)
                delete currentParams[key]
            } else {
                newUrl.searchParams.set(key, value)
                currentParams[key] = value
            }
        })

        window.history.pushState({}, '', newUrl)
        this.searchParams(currentParams)
    }

    derive(path: string = this.path(), data: InputRouteData<T>[] = []) {
        return new Router(data, this.history, `${this.parentPath}${path}`, this)
    }
}

export { createBrowserHistory, createHashHistory, createMemoryHistory} from 'history'
