/** @jsx h */
import { h, Helmet, Component, Suspense } from "../deps.ts"
import { getFolderContent } from './utility/folder.ts'
import type { DocsEntry } from './utility/folder.ts'
import { Menu } from './components/menu.tsx'
import {Page} from './components/page.tsx'

const getPages = () => getFolderContent('./pages')
const pages = await getPages()
const App = () => (
    <div>
        <Helmet>
            <title>Nano JSX SSR</title>
            <meta
                name="description"
                content="Server Side Rendered Nano JSX Application"
            />
        </Helmet>
        
            <Menu entries={ pages} />
            <Page />

        <div id="comments">
            {/* <Comments comments={comments} /> */}
        </div>
    </div>
)



export {
    App
}