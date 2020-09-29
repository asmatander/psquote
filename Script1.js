// JavaScript source code
const quotetext = document.getElementById('quote');
const quoteauthor = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newquotebtn = document.getElementById('new-quote'); 

async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const json_response = await response.json();

        if (json_response.quoteAuthor == '') {
            quoteauthor.innerText = 'unknown'
        }
        else {
            quoteauthor.innerText = json_response.quoteAuthor;
        }
        if (json_response.quoteTex > 120) {
            quotetext.classList.add('long-quote');
        }
        else {
            quotetext.classList.remove('long-quote');
        }
        quotetext.innerText = json_response.quoteText;
        console.log(json_response);

    }
    catch(error)
    {
        getQuote();
        console.log('Whoops! No Quote', error)
    }
}

function tweet_quote() {
    const quote = quotetext.innerText;
    const quote_author = quoteauthor.innerText;
    const twitterurl = `https://twitter.com/intent/tweet?text=${quote}-${quote_author}`;
    window.open(twitterurl, '_blanck');
}

newquotebtn.addEventListener('click', getQuote);
twitterbtn.addEventListener('click', tweet_quote);

getQuote();
