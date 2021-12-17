import React from 'react';
import { useEffect } from 'react';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import { Link, useParams, Route, useRouteMatch } from 'react-router-dom';
import Comments from '../comments/Comments';
import HighlightedQuote from '../quotes/HighlightedQuote';
import NoQuotesFound from '../quotes/NoQuotesFound';
import LoadingSpinner from '../UI/LoadingSpinner';

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered'>{error}</p>;
  }

  if (status === 'completed' && !loadedQuote.text && !loadedQuote.author) {
    return <NoQuotesFound />;
  }
  return (
    <>
      <h1>QuoteDetail Page</h1>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>
            comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
