import React from "react"

const Highlight = ({text, children}) => {
  return (
    <span style={{"background": "rgb(255,0,106)", "background" : "linear-gradient(90deg, rgba(255,0,106,1) 0%, rgba(110,106,175,1) 46%, rgba(0,230,255,1) 100%)"}}>{text}{children}</span>
  )
}

export default Highlight