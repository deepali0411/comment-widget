import logo from './logo.svg';
import './App.css';
import Comments from './components/comments/Comments';
import { useState } from 'react';
import useTraverseTree from './components/hooks/useTraverseTree';
import { context } from './context';
import { data } from './data';

function App() {
  const [commentsData, setCommentsData] = useState(data);
  const {createComment, deleteComment, updateComment} = useTraverseTree();

 const handleUpdateComments = (task, value, isRoot, id, objId) => {
  let data;
  if(task === 'create'){
     data = createComment(commentsData, value, isRoot, id);
  }
  else if(task === 'delete'){
    data = deleteComment(commentsData, id, isRoot, objId)
  }
  else data = updateComment(commentsData, value, id, isRoot, objId)
  setCommentsData((data));
 }

  return (
    <div className="App">
      <context.Provider value={commentsData}>
      <Comments handleUpdateComments={handleUpdateComments} />
      </context.Provider>
    </div>
  );
}

export default App;
