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
  }

};

AppGtag.init();
if (window.location.hostname != "localhost") {
  AppGtag.init();
}