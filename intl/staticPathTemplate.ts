import { GetStaticProps, GetStaticPaths } from "next"

export const getStaticPaths: GetStaticPaths = async () => {
    const languages = ["en", "fr", "gb"]

    return {
        paths: languages.map((language) => ({
            params: { lang: language }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => ({
    props: {
        ...params
    }
})
