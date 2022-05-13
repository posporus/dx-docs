/** @jsx h */
import {
    Application,
    Router,
    h,
    Helmet,
    renderSSR,
} from './deps.ts'

import {
  getPages
} from './src/utility/folder.ts'

import {App} from './src/app.tsx'

import {store} from './store.ts'

import {bundle} from './bundle.ts'

//const getPages = () => getFolderContent('./pages')
const {pages,structure,pathIds} = await getPages()

store.use().setState({pathIds})

const ssr = renderSSR(<App pages={structure} />)
const { body, head, footer } = Helmet.SSR(ssr)

console.log(pages)

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${head.join('\n')}
  </head>
  <body>
    ${body}
    ${footer.join('\n')}
  </body>
</html>`


const router = new Router()
router.get("/bundle.js", async (ctx) => {
  ctx.response.body = await bundle('src/app.tsx')
})
router.get("/:id", (ctx) => {
  const {id} = ctx.params
  console.log('get id', id)
  if(pages[id]) ctx.response.body = pages[id]
  else ctx.response.body = html
})
router.get("/", (ctx) => {
  ctx.response.body = html
})
router.get("/(.*)", (ctx) => {
  ctx.response.body = html
})


const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener(
  "listen",
  (e) => console.log("Listening on http://localhost:8080"),
);
await app.listen({ port: 8080 })