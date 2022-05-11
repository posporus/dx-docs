/** @jsx h */

import {
    Component,
    h,
    Link,
    Suspense,
} from '../../deps.ts'

import type { DocsEntry } from '../utility/folder.ts'
import { ContentType } from '../utility/folder.ts'

const Menu = (props: { entries: DocsEntry[] }) => (
    <div>
        <h3>Menu</h3>
        <List entries={props.entries || []} />
    </div>
)

const List = (props: { entries: DocsEntry[] }) => {
    return (
        <ul>
            {props.entries?.map(entry => listEntry(entry))}
        </ul>
    )
}

const listEntry = (entry: DocsEntry) => {
    return (
        entry.sub !== undefined ? <li>{entry.title}<List entries={entry.sub} /></li> : <li><a href={entry.url}>{entry.title}</a></li>
    )
}

export {
    Menu
}