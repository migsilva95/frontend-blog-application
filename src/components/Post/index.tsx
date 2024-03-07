import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Heading, Stack, Text } from '@chakra-ui/react';
import { BlogListType } from '../../types/blogList.type';
import parse from 'html-react-parser';
import Comments from './Comments';

function Post({postId}: {postId: number}) {

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
        <Stack spacing='4'>
            {
                post &&
                    <Card>
                        <CardHeader>
                            <Heading size='md'>{post.title}</Heading>
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
        </Stack>
        <Comments postId={postId}/>
    </>
  );
}

export default Post;