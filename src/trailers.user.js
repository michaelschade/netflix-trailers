var jqueryURL = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js";

function main() {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  // YouTube URL for trailer
  function trailerURL(movieName) {
    return 'https://youtube.com/results?search_query=' + encodeURIComponent(movieName + ' trailer');
  }

  // jQuery link element with tracking
  function trailerLink(movieName, id) {
    return $('<a>', {
      href: trailerURL(movieName),
      text: 'Trailer',
      target: '_blank',
      id: id
    }).click(function() {
      _gaq.push(['_trackEvent', $(this).attr('id'), 'clicked']);
    });
  }

  // Detect movie popover and add trailer link
  function monitorPreview() {
    var target = document.querySelector('#BobMovie-content');
    var observer = new MutationObserver(function(mutations) {
      var movieName = $('#BobMovie-content .mdpLink .title').text().trim();
      var link$ = trailerLink(movieName, 'trailer-popover');
      $('#BobMovie-content .readMore.mdpLink').after(link$).after(' \u00B7 ');
    });
    observer.observe(target, { childList: true });
  }

  // Add trailer link to movie detail page
  function movieInfo() {
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
}

/* Injects jQuery into the page and makes useable from the below Greasemonkey
   script. Snippet via
   http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script */
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", jqueryURL);
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(main);

/* Google Analytics Tracking */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38014084-2']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript';
    ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
})();
