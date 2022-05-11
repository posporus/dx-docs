interface DocsEntry {
    name: string,
    title: string,
    type: ContentType,
    url: string
    sub?: DocsEntry[]
}
enum ContentType {
    IGNORE,
    FOLDER,
    HTML,
    MARKDOWN,
    JSX,
}

const getFolderContent = async (folder: string): Promise<DocsEntry[]> => {
    //TODO: do this with map?
    const dirContent = []
    for await (const entry of Deno.readDir(folder)) {
        const type = getFileType(entry)

        if (type !== ContentType.IGNORE) {
            const { name } = entry
            const title = name
            const url = folder + '/' + name
            const docsEntry: DocsEntry = {
                name, title, url, type
            }

            if (type === ContentType.FOLDER) docsEntry.sub = await getFolderContent(url)

            dirContent.push(docsEntry)
        }

    }
    return dirContent
}

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
    getFolderContent
}
export type {
    DocsEntry
}