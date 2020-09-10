const {
        mkdirSync,
        existsSync,
        readFileSync,
        writeFileSync,
        watch
    } = require("fs"),
    { resolve } = require("path"),
    { sync: removeDir } = require("rimraf")

const { files } = require("node-dir")

const { exec } = require("child_process")

const languageTemplate = readFileSync(
    resolve(__dirname, "staticPathTemplate.ts")
)

const pages = resolve(__dirname, "..", "pages"),
    routes = resolve(__dirname, "..", "routes")

files(routes, (err, files) => {
    if (err) throw err

    if (existsSync(pages)) removeDir(pages)
    mkdirSync(pages)

    mkdirSync(resolve(pages, "[lang]"))

    files.forEach((file) => {
        const longPath = file
            .replace(routes)
            .split("/")
            .filter((path) => path !== "undefined" && !path.includes("."))

        longPath.map((path, index) => {
            const parsedPath = Array(index + 1)
                .fill()
                .map((_, index) => longPath[index])
                .join("/")

            if (existsSync(resolve(pages, parsedPath))) return

            mkdirSync(resolve(pages, parsedPath))
            mkdirSync(resolve(pages, "[lang]", parsedPath))
        })

        const template = readFileSync(file, {
            encoding: "utf-8"
        })

        const content = !template.includes("getStaticProps")
            ? template.replace(
                  "export default",
                  `${languageTemplate}\nexport default`
              )
            : template

        writeFileSync(file.replace("routes", "pages"), template)
        writeFileSync(file.replace("routes", `pages/[lang]`), content)

        if(!process.argv.includes("build"))
            watch(file, (event, fileContent) => {
                const template = readFileSync(file, {
                    encoding: "utf-8"
                })

                const content = !template.includes("getStaticProps")
                    ? template.replace(
                        "export default",
                        `${languageTemplate}\nexport default`
                    )
                    : template

                console.log(file.replace("routes", "pages"), template)

                writeFileSync(file.replace("routes", "pages"), template)
                writeFileSync(file.replace("routes", `pages/[lang]`), content)
            })
    })

    if(!process.argv.includes("build")) {
        exec("npx next", (error, stdout, stderr) => {
            if (error) console.log(`error: ${error.message}`)
            if (stderr) console.log(`stderr: ${stderr}`)

            console.log(`stdout: ${stdout}`)
        })

        console.log("Dev Server Started")
    }
})
