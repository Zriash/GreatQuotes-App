import React from 'react';
import { useEffect } from 'react';
import QuoteForm from '../quotes/QuoteForm';
import { useHistory } from 'react-router';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
      history.push('/quotes');
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  return (
    <>
      <h1>NewQuote page</h1>
      <QuoteForm
        isLoading={status === 'pending'}
        onAddQuote={addQuoteHandler}
      />
    </>
  );
};

export default NewQuote;
