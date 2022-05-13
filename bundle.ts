
export const bundle = async (file: string) => {
  const emitOptions: Deno.EmitOptions = {
    bundle: "module",
    compilerOptions: {
      target: "esnext",
      /* importMapPath: path.join(__dirname, "..", "import_map.json"),
      lib: ["dom", "dom.iterable", "dom.asynciterable", "deno.ns"], */
    }
  }

  const { files, diagnostics } = await Deno.emit(file, emitOptions,)

  return files['deno:///bundle.js']
}

//console.log(await bundle('src/app.tsx'))