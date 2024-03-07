import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import List from './components/List';
import Post from './components/Post';

function App() {

  const [postId, setPostId] = useState<number>(0);

  return (
    <ChakraProvider>
      {postId === 0 ?
        <List setPostId={setPostId} />
      :
        <Post postId={postId} setPostId={setPostId} />
      }
    </ChakraProvider>
  );
}

export default App;
