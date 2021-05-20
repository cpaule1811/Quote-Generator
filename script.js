const newQuote = document.getElementById('button'); 
const tweet = document.getElementById('twitter');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author')
const quoteContainer = document.getElementById('container');
const loader = document.getElementById('loader');

let quotes = [];
let i = 0;

function toggleLoadingSpinner(loadingStatus) {
    if(loadingStatus){ 
        loader.hidden = false;
        quoteContainer.hidden = true;
    } else {
    quoteContainer.hidden = false;
    loader.hidden = true;
    }
}
 

function makeQuote(){ 
    quoteText.innerHTML = `"${quotes[i].quote}"`;
    authorText.innerHTML = `- ${quotes[i].character}`;
    toggleLoadingSpinner(false);
    i++;
    if (i > quotes.length -2){  
         loadQuotes()
    }
}

async function loadQuotes (){
    toggleLoadingSpinner(true); 
    try {
      const url = 'https://animechan.vercel.app/api/quotes';
      const response = await fetch(url);
      const data = await response.json();
      quotes = quotes.concat(await data);
      makeQuote();
    }
    catch(e) { 
       console.log('Sorry we could not find quotes')
    }
} 

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

tweet.addEventListener('click', tweetQuote);
newQuote.addEventListener('click', makeQuote)

loadQuotes();



