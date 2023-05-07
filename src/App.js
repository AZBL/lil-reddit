import "./App.css";

//pages and layouts
import Home from "./components/Home";
import Post from "./components/Post";
// import Comments from "./components/Comments";
import SubReddit from "./components/SubReddit";
import RootLayout from "./components/RootLayout";

//react router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/post/:postId" element={<Post />} /> //posts
      <Route path="/subreddit/:subredditId" element={<SubReddit />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

