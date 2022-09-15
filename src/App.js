import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {

    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/quotes' exact/>
                    </Route>

                    <Route path='/quotes' exact>
                        <AllQuotes/>
                    </Route>

                    <Route path='/quotes/:quoteId'>
                        <QuoteDetail/>
                    </Route>

                    <Route path='/new-quote'>
                        <NewQuote/>
                    </Route>

                    <Route path='*'>
                        <NotFound/>
                    </Route>

                </Switch>
            </Layout>
        </BrowserRouter>

    );
}

export default App;
