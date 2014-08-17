MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// YouTube URL for trailer
function trailerURL(movieName) {
  return 'https://youtube.com/results?search_query=' + encodeURIComponent(movieName + ' trailer');
}

// jQuery link element with tracking
function trailerLink(movieName, id) {
  return $('<a>', {
    href: trailerURL(movieName),
    text: 'Watch Trailers',
    target: '_blank',
    id: id
  }).click(function() {
    chrome.runtime.sendMessage({
      action: 'trackEvent',
      params: ['Trailers', 'YouTube Search']
    });
  });
}

// Detect movie popover and add trailer link
function monitorPreview() {
  var target = document.querySelector('#BobMovie-content');
  var observer = new MutationObserver(function(mutations) {
    chrome.runtime.sendMessage({
      action: 'trackEvent',
      params: ['Trailers', 'Load popover']
    });
    var movieName = $('#BobMovie-content .mdpLink .title').text().trim();
    var link$ = trailerLink(movieName, 'trailer-popover');
    $('#BobMovie-content .readMore.mdpLink').after(link$).after(' \u00B7 ');
  });
  observer.observe(target, { childList: true });
}

// Add trailer link to movie detail page
function movieInfo() {
  chrome.runtime.sendMessage({
    action: 'trackEvent',
    params: ['Trailers', 'Load info view']
  });
  var header$ = $('h1.title');
  var movieName = header$.text().trim();
  var link$ = $('<span>', {
    class: 'year'
  }).append(trailerLink(movieName, 'trailer-detail'));
  header$.parent().after(link$);
}

/* Route page to proper processing logic */
switch (window.location.pathname.split('/')[1]) {
  case "WiHome": // Home/movie popover
    monitorPreview();
    break;
  case "WiMovie": // Movie detail page
    movieInfo();
    break;
  default:
    break;
}
