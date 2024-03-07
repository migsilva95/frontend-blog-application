import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { CommentListType } from '../../../types/commentList.type';

function Comments({postId}:{postId: number}) {

    const [commentList, setCommentList] = useState<CommentListType[]>([])
    const [contentUpdated, setContentUpdated] = useState('')
    const [commentToEdit, setCommentToEdit] = useState<number | null>(null)
    const [userAdded, setUserAdded] = useState<string>('')
    const [dateAdded, setDateAdded] = useState<string>('')
    const [contentAdded, setContentAdded] = useState<string>('')
    const [addNewComment, setAddNewComment] = useState(false)

    const updateListComments = () => {
        axios.get(`http://localhost:9000/posts/${postId}/comments`)
        .then(res => {
          const list = res.data;
          setCommentList(list.sort((a: CommentListType, b: CommentListType) => a.date < b.date ? 1 : -1));
        });
    }

    useEffect(() => {
        updateListComments();
    },[postId])

    const editComment = (commentId: number, commentContent: string) => {
        setContentUpdated(commentContent);
        setCommentToEdit(commentId);
    }

    const updateComment = async (comment: CommentListType) => {
        const res = await axios.put(`http://localhost:9000/comments/${comment.id}`,
            {
                postId: comment.postId,
                parent_id: comment.parent_id,
                user: comment.user,
                date: comment.date,
                content: contentUpdated
            });
        setCommentToEdit(null);
        updateListComments();
    }

    const addComment = async () => {
        const res = await axios.post(`http://localhost:9000/posts/${postId}/comments`,
            {
                user: userAdded,
                date: dateAdded,
                content: contentAdded
            });
        setAddNewComment(false);
        updateListComments();
    }

  return (
    <>
        <br />
        <Text data-testid="comments-title" fontSize='2xl'>Comments</Text>
        <br />
        <Stack spacing='4'>
            <Card>
                {
                    commentList ?
                        <>
                            {commentList.map((cL) => {
                                return (
                                    <>
                                        <CardHeader>
                                            <Heading size='md'>{cL.user}</Heading>
                                            <Heading size='xs'>{cL.date}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            {commentToEdit === cL.id ?
                                                <Input placeholder='Content' onChange={(event) => setContentUpdated(event.target.value)} value={contentUpdated} />
                                                :
                                                <Text fontSize='sm'>
                                                    {cL.content}
                                                </Text>
                                            }
                                        </CardBody>
                                        <CardFooter>
                                            {commentToEdit === cL.id ?
                                                <>
                                                    <Button colorScheme='blue' onClick={() => updateComment(cL)}>Save Comment</Button>
                                                    <Button colorScheme='blue' variant='outline' onClick={() => setCommentToEdit(null)}>Cancel</Button>
                                                </>
                                            :
                                                <Button colorScheme='blue' onClick={() => editComment(cL.id, cL.content)}>Edit Comment</Button>
                                            }
                                        </CardFooter>
                                    </>
                                )
                            })}
                        </>
                        : 
                        <CardBody>
                            <Text pt='2' fontSize='sm'>
                                {"No comments found"}
                            </Text>
                        </CardBody>
                }
                {addNewComment ? 
                    <>
                        <CardHeader>
                            <Heading size='md'>Add New Comment</Heading>
                        </CardHeader>
                        <CardBody>
                            <Input placeholder='User' onChange={(event) => setUserAdded(event.target.value)} value={userAdded} />
                            <Input placeholder='Date' type="datetime-local" onChange={(event) => setDateAdded(event.target.value)} value={dateAdded} />
                            <Input placeholder='Content' onChange={(event) => setContentAdded(event.target.value)} value={contentAdded} />
                        </CardBody>
                        <CardFooter>
                            <Button colorScheme='blue' onClick={() => addComment()}>Add Comment</Button>
                            <Button colorScheme='blue' variant='outline' onClick={() => setAddNewComment(false)}>Cancel</Button>
                        </CardFooter>
                    </>
                    :
                    <Button colorScheme='blue' onClick={() => setAddNewComment(true)}>Add New Comment</Button>
                }
            </Card>
        </Stack>
    </>
  );
}

export default Comments;