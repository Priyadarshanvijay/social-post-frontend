import React, { useEffect, useState } from 'react'
import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react'
import { postRequest } from '../utils/postRequests';
import { appendToStateArray } from "../utils/stateUpdate";

const Comments = ({ commentsList, postId }) => {

  const [comments, setComments] = useState([]);

  const [username, setUsername] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postComment = async (commentToPost) => {
    const body = {
      comment: commentToPost,
      postId
    };
    try {
      const response = await postRequest(`comment`)(body);
      const newCommentToAppend = {
        username,
        textContent: newComment,
        id: response.commentId
      };
      appendToStateArray(setComments)([newCommentToAppend]);
    } catch (e) {
      console.log(e)
    } finally {
      setIsSubmitting(false);
      setUsername('');
      setNewComment('');
    }
  }

  const handleChangeMap = {
    username: setUsername,
    newComment: setNewComment
  }

  const handleChange = (e, { name, value }) => {
    handleChangeMap[name](value)
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await postComment({ username, textContent: newComment });
  };

  useEffect(() => {
    setComments(commentsList || []);
  }, []);

  return (
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>
      {(comments || []).map((comment) => (
        <Segment raised>
          <Comment>
            <Comment.Content>
              <Comment.Author>
                {comment.username}
              </Comment.Author>
              <Comment.Text>
                {comment.textContent}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        </Segment>
      ))}
      <Header as='h3' dividing>
        Add a new comment
      </Header>
      <Form size='small' loading={isSubmitting} onSubmit={handleSubmit}>
        <Form.Input label='Username' name='username' value={username} onChange={handleChange} />
        <Form.TextArea label='Comment' name='newComment' value={newComment} onChange={handleChange} />
        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
  )
}

export default Comments;