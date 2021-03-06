import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import AddAuthorForm from './AddAuthorForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

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

function reducer(state = { authors, turnData: getTurnData(authors), highlight: ''}, 
action){
    switch (action.type){
        case 'ANSWER_SELECTED':
             const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
        return Object.assign({}, state, { 
            highlight: isCorrect ? 'correct' : 'wrong'
        });
        case 'CONTINUE':
                return Object.assign({}, state, {
                    highlight: '', turnData: getTurnData(state.authors)
                });
        case 'ADD_AUTHOR':    
                return Object.assign({}, state, {
                    authors: state.authors.concat([action.author])
                })
            default: return state;
            }
}
let store = Redux.createStore(reducer);

    ReactDOM.render(
    <BrowserRouter>
      <ReactRedux.Provider store={store}>
    <React.Fragment>
    <Route exact path="/" component={AuthorQuiz} />
    <Route exact path="/add" component={AddAuthorForm} />
    </React.Fragment>
    </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));
serviceWorker.unregister();
