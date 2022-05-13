/** @jsx h */
import { h, Helmet, Component, Suspense } from "../deps.ts"
import type { DocsEntry } from './utility/folder.ts'
import { Menu } from './components/menu.tsx'
import { Page } from './components/page.tsx'

const App = (props: { pages: DocsEntry[] }) => (
    <div>
        <Helmet>
            <title>Nano JSX SSR</title>
            <meta
                name="description"
                content="Server Side Rendered Nano JSX Application"
            />
        </Helmet>

        <Menu entries={props.pages} />
        <Page />

    </div>
)

export {
    App
}