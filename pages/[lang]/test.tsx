import { Fragment } from "react"

const Landing = ({ lang = "en" }) => (
  <Fragment>
    <h1>Test Page</h1>
    <h4>Lang: {lang}</h4>
  </Fragment>
)

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

export default Landing
