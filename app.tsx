/** @jsx h */
import { h, Helmet } from "./deps.ts"
/* import { markdownToHTML } from "https://deno.land/x/md2html@v1.0.6/mod.ts"
const markdown = await markdownToHTML('./pages/index.md') */
import {parseMarkdown} from "https://deno.land/x/markdown_wasm@1.2.2/mod.ts"
const file = await Deno.readFile('./pages/index.md')
const Md = () => ['e',parseMarkdown(file).toString()]
console.log('MD:',Md)
export const App = () => (
    <div>
        <Helmet>
            <title>Nano JSX SSR</title>
            <meta
                name="description"
                content="Server Side Rendered Nano JSX Application"
            />
        </Helmet>
        <h2>Comments</h2>
        <Md/>

        <div id="comments">
            {/* <Comments comments={comments} /> */}
        </div>
    </div>
);
