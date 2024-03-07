import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Heading, Stack, Text } from '@chakra-ui/react';
import { CommentListType } from '../../../types/commentList.type';

function Comments({postId}:{postId: number}) {

    const [commentList, setCommentList] = useState<CommentListType[]>([])

    useEffect(() => {
        axios.get(`http://localhost:9000/posts/${postId}/comments`)
          .then(res => {
            const list = res.data;
            setCommentList(list.sort((a: CommentListType, b: CommentListType) => a.date < b.date ? 1 : -1));
          })
    },[postId])

  return (
    <Stack spacing='4'>
        {
            commentList ?
                <>
                    {commentList.map((cL) => {
                        return (
                            <Card>
                                <CardHeader>
                                    <Heading size='md'>{cL.user}</Heading>
                                    <Heading size='xs'>{cL.date}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text pt='2' fontSize='sm'>
                                        {cL.content}
                                    </Text>
                                </CardBody>
                            </Card>
                        )
                    })}
                </>
                : 
                <Card>
                    <CardBody>
                        <Text pt='2' fontSize='sm'>
                            {"No comments found"}
                        </Text>
                    </CardBody>
                </Card>
        }
    </Stack>
  );
}

export default Comments;