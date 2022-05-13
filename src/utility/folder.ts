interface PagesStore {
    structure: DocsEntry[]
    pages: Pages
    pathIds: PathIds
}
type Pages = {
    [id: string]: string
}
type PathIds = {
    [path: string]: string
}

interface DocsEntry {
    name: string,
    title: string,
    type: ContentType,
    path: string
    id: string
    sub?: DocsEntry[]
}
enum ContentType {
    IGNORE,
    FOLDER,
    HTML,
    MARKDOWN,
    JSX,
}

/* class PagesStore {
    structure: DocsEntry[]
    pages: { [id: string]: string }
    constructor () {
        this.structure = []
        this.pages = {}
    }
    addPage(){

    }
} */
const getPages = async (): Promise<PagesStore> => {
    const pages: Pages = {}
    const pathIds: PathIds = {}

    const getFolderContent = async (folder: string): Promise<DocsEntry[]> => {
        //TODO: do this with map?
        const docsEntrys: DocsEntry[] = []
        //Get directory content
        for await (const entry of Deno.readDir(folder)) {
            const type = getFileType(entry)

            if (type !== ContentType.IGNORE) {
                const { name } = entry
                const title = name
                const path = folder + '/' + name
                const id = crypto.randomUUID()
                const docsEntry: DocsEntry = {
                    name, title, path, type, id
                }

                if (type === ContentType.FOLDER) docsEntry.sub = await getFolderContent(path)
                else pages[id] = await Deno.readTextFile(path)

                pathIds[path] = id
                docsEntrys.push(docsEntry)
                console.log(await Deno.realPath(path))

            }

        }
        return docsEntrys
    }

    const structure = await getFolderContent('./pages')

    return { structure, pages, pathIds }
}






/**
 * Determines the filetype
 * @param param0 
 * @returns 
 */
const getFileType = ({ name, isDirectory, isFile }: Deno.DirEntry): ContentType => {

    if (isDirectory) return ContentType.FOLDER
    if (!isFile) return ContentType.IGNORE
    if (name.endsWith('.md')) return ContentType.MARKDOWN
    if (name.endsWith('.html') || name.endsWith('.htm')) return ContentType.HTML
    if (name.endsWith('.tsx') || name.endsWith('.jsx')) return ContentType.JSX
    return ContentType.IGNORE

}

export {
    ContentType,
    getPages
}
export type {
    DocsEntry
}