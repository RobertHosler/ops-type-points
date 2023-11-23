// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});

var AppGtag = {

  status: 'denied',

  init: function() {
    gtag("js", new Date());
    gtag("config", "UA-174226884-1");
  },

  consent: function(consented) {
    this.status = consented ? 'granted' : 'denied';
    gtag('consent', 'update', {
      'analytics_storage': this.status
    });
  },

  // clear all cookies
  reset: function() {
    const cookies = document.cookie.split("; ")
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0];
      if (cookieName.startsWith("_ga_")) {
        document.cookie = cookieName + '=; Max-Age=-99999999;';
      }
    });
    document.cookie = '_ga=; Max-Age=-99999999;';
    document.cookie = '_gid=; Max-Age=-99999999;';
  }

};

AppGtag.init();
if (window.location.hostname != "localhost") {
  AppGtag.init();
}