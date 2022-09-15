import {Link, Route, useParams, useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import {useEffect} from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
    useHttp();
    const params = useParams();
    const match = useRouteMatch();

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true)

    const {quoteId} = params;

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId])

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner/>
        </div>
    }

    if (!loadedQuote.text) {
        return <p className='error'>No quote found!</p>;
    }

    if (error) {
        return <p className='centered focused'>{error}</p>
    }




    return (
        <>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link to={`${match.url}/comments`} className='btn--flat'>Show Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Route path={`/quotes/${params.quoteId}/comments`}>
                    <Link to={`${match.url}`} className='btn--flat'>Hide Comments</Link>
                </Route>
                <Comments/>
            </Route>
        </>
    )
        ;
};

export default QuoteDetail;