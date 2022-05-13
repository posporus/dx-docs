/** @jsx h */

import {
    Component,
    h,
    Link,
    Suspense,
    NRouter
} from '../../deps.ts'

import { store } from '../../store.ts'

export class Page extends Component {

    pathIds = store.use().state.pathIds

    listener = NRouter.Listener().use()
    async getPage () {
        //const { parseParamsFromPath } = NRouter
        const { path } = this.props.route
        const id = this.pathIds[path]
        console.log('id:',id)
        const html = await this.fetchPage('./' + id)
        this.update(html)
    }

    async didMount () {
        this.listener.subscribe((curr, prev) => {
            if (curr !== prev/*  && /^/blog / d + $ /.test(curr) */) {
                this.getPage()
            }
        })
        console.log('didMount')
        await this.getPage()
    }

    async fetchPage (id: string) {
        const res = await fetch('./' + id)
        return await res.text()
    }

    render (html: string) {
        if (html) return <div>{html}</div>
        return <div>loading...</div>
    }
}