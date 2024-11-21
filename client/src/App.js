import PostCreate from "./PostCreate";
import Postlist from "./Postlist";

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr/>
      <h1> Post</h1>
      <Postlist/>
    </div>
  );
};
export default App;
