import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Heading, Stack, Text } from '@chakra-ui/react';
import { BlogListType } from '../../types/blogList.type';
import parse from 'html-react-parser';
import Comments from './Comments';

function Post({postId, setPostId}: {postId: number, setPostId: (value: number) => void}) {

    const [post, setPost] = useState<BlogListType | null>(null)

    useEffect(() => {
        axios.get(`http://localhost:9000/posts/${postId}`)
          .then(res => {
            const post = res.data;
            setPost(post);
          })
    },[postId])

  return (
    <>
        <br />
        <Button data-testid="go-back-button" colorScheme='blue' onClick={() => setPostId(0)}>Go Back</Button>
        <br />
        {
            post &&
                <Card>
                    <CardHeader>
                        <Heading size='lg'>{post.title}</Heading>
                        <Heading size='xs'>{post.author}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text pt='2' fontSize='sm'>
                            {post.publish_date}
                        </Text>
                        <Text pt='2' fontSize='sm'>
                            {post.description}
                        </Text>
                        <Text pt='2' fontSize='sm'>
                            {parse(post.content)}
                        </Text>
                    </CardBody>
                </Card>
        }
        <Comments postId={postId}/>
    </>
  );
}

export default Post;