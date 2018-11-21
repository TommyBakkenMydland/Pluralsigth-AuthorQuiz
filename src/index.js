import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import AddAuthorForm from './AddAuthorForm';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn', 'Life on the Mississipi',
        'Rough']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Oliver Twist', 'The Old Curiosity Shop', 'Great Expectations']
    },
    {
        name: 'Henry Fielding',
        imageUrl: 'images/authors/henryfielding.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Masquerade', 'The Letter Writers', 'The Lottery']
    }
];

function getTurnData() {
    const allBooks = authors.reduce(function (p,c,i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
        author.books.some((title) =>
        title === answer))
    }

}
function resetState() {
    return{
        turnData: getTurnData(authors),
        highlight: ''            
    };

}
let state = resetState();

 function onAnswerSelected (answer) {
     const isCorrect = state.turnData.author.books.some((book) => book === answer);
     state.highlight = isCorrect ? 'correct' : 'wrong';     
     render();
}

function App() {
   return (
    <AuthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected}
    onContinue={() => {
    state = resetState();
    render();
    }} />
   );

}
const AuthorWrapper = withRouter (({ history }) =>
    <AddAuthorForm onAddAuthor={(author) =>
    {   authors.push(author);
        history.push('/');
    }} />
);

function render()
{
    ReactDOM.render(
    <BrowserRouter>
    <React.Fragment>
    <Route exact path="/" component={App} />
    <Route exact path="/add" component={AuthorWrapper} />
    </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
render();
serviceWorker.unregister();
