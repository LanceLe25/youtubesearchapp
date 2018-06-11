'use strict'

const YOUTUBE_SEARCH_URL ="https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callBack) {
  const query = {
    key: 'AIzaSyCFAVybJkh7lHQFJU19XMnu2_7j1f8S5sk',
    type: 'video',
    part: 'snippet',
    q: searchTerm,
    maxResults: 2,
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callBack);
}

function renderResult(result) {
  return `
  <div>
    <div class ="search-result">
    <p class ="title">${result.snippet.title}</p>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
    <img src="${result.snippet.thumbnails.medium.url}" class="thumbnail-image">
    </a>
    </div>
  </div>
  `;
}

function displayYoutubeSearchData(data) {
  let results = data.items.map((item, index) => 
  renderResult(item));
  $('.js-results').html(results);
}

function searchSubmit () {
  console.log('ran');
  $('.js-form').submit(event => {
  event.preventDefault();
   const queryTarget = $(event.currentTarget).find('.js-query');
   const query = queryTarget.val();
   queryTarget.val("");
   getDataFromApi(query, displayYoutubeSearchData);
  
  });
}

$(searchSubmit);