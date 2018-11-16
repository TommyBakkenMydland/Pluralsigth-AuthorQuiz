import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
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

const state = {
    turnData: getTurnData(authors)
    };
 


ReactDOM.render(<AuthorQuiz {...state} />, document.getElementById('root'));
serviceWorker.unregister();