import * as $ from 'jquery'
import Post from "./Post";
import "./styles/styles.css"
import "./styles/scss.css"
import "./babel"

const post =new Post("webpack post")

console.log("post to string", post.toString())