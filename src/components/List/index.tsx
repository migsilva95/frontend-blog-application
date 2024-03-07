import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Stack, Text } from '@chakra-ui/react';
import { BlogListType } from '../../types/blogList.type';
import parse from 'html-react-parser';

function List({setPostId}:{setPostId: (value: number) => void}) {

    const [postList, setPostList] = useState<BlogListType[]>([])

    useEffect(() => {
        axios.get(`http://localhost:9000/posts`)
          .then(res => {
            const list = res.data;
            setPostList(list.sort((a: BlogListType, b: BlogListType) => a.publish_date < b.publish_date ? 1 : -1));
          })
    },[])

  return (
    <>
        <Text data-testid="posts-title" fontSize='4xl'>Posts</Text>
        <Stack spacing='4'>
            {
                postList ?
                    <>
                        {postList.map((pL) => {
                            return (
                                <Card>
                                    <CardHeader>
                                        <Heading size='md'>{pL.title}</Heading>
                                        <Heading size='xs'>{pL.author}</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text pt='2' fontSize='sm'>
                                            {pL.publish_date}
                                        </Text>
                                        <Text pt='2' fontSize='sm'>
                                            {pL.description}
                                        </Text>
                                        <Text pt='2' fontSize='sm'>
                                            {parse(pL.content)}
                                        </Text>
                                    </CardBody>
                                    <CardFooter>
                                        <Button colorScheme='blue' onClick={() => setPostId(pL.id)}>View Post</Button>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </>
                    : 
                    <Card>
                        <CardBody>
                            <Text pt='2' fontSize='sm'>
                                {"No data found"}
                            </Text>
                        </CardBody>
                    </Card>
            }
        </Stack>
    </>
  );
}

export default List;