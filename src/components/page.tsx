/** @jsx h */

import {
    Component,
    h,
    Link,
    Suspense,
    NRouter
} from '../../deps.ts'

export class Page extends Component {
    listener = NRouter.Listener().use()
    async getPage () {
        const { parseParamsFromPath } = NRouter
        //const path = parseParamsFromPath(this.props.route.path)
        console.log('path:', this.props.route.path)
        await Promise
        this.update('asdf' + new Date())
    }

    async didMount () {
        this.listener.subscribe((curr, prev) => {
            if (curr !== prev/*  && /^/blog / d + $ /.test(curr) */) {
                this.getPage()
            }
        })
        await this.getPage()
    }

    render (post: string) {
        if (post) return <div>{post}</div>
        return <div>loading...</div>
    }
}