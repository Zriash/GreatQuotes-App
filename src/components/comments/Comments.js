import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import classes from './Comments.module.css';
import useHttp from '../hooks/use-http';
import { getAllComments } from '../lib/api';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const params = useParams();
  const { quoteId } = params;
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    sendRequest,
    status,
    data: loadedComments,
    error,
  } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
    setIsAddingComment(false);
  }, [sendRequest, quoteId]);

  let comments;

  if (status === 'pending') {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && loadedComments.length > 0 && !error) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (status === 'completed' && loadedComments.length === 0 && !error) {
    comments = <p className='centered'>Be the first one to comment</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} onAddComment={addCommentHandler} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
