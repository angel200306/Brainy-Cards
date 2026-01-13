import React from "react"
import ReactDOMClient from "react-dom/client"
import App from "./App"
import "./css/style.css"

const root = ReactDOMClient.createRoot(document.getElementById("app"))
root.render(<App />)