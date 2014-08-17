var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38014084-2']);
_gaq.push(['_trackPageview']);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'trackEvent') {
    console.log("Tracking event " + request.action + " with params: " + request.params);
    _gaq.push(['_trackEvent'].concat(request.params));
  }
});

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript';
    ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
})();
