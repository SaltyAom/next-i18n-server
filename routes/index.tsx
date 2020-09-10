import { Fragment } from "react"

const Landing = ({ lang = "en" }) => (
  <Fragment>
    <h1>Hello World</h1>
    <h4>Lang: {lang}</h4>
  </Fragment>
)

export default Landing
