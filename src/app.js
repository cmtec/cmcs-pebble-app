var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings');
var api_key = Settings.option('api_key');
var api_url = Settings.option('api_url');

Settings.config(
  'https://www.cmtec.se/cmcs-pebble-app-settings/cmcs-pebble-app-settings.html',
  function open(e) {
    console.log('open: ' + JSON.stringify(e.options));
  },
  function close(e) {
    console.log('close: ' + JSON.stringify(e.options));
  }
);

ajax({
  url: api_url + '?driver=pebble',
  type: 'json',
  },
  function(data) {
    var menu = new UI.Menu({
      backgroundColor: 'black',
      textColor: 'white',
      highlightBackgroundColor: 'white',
      highlightTextColor: 'black',
      status: {
        color: 'white',
        backgroundColor: 'black',
        separator: 'none',
      },
      sections: [{
        items: data
      }]
    });

    menu.on('select', function(e) {
      ajax({
        url: api_url + '?driver=pebble&zone=' + e.item.title,
        type: 'json',
        },
        function(data) {
          var menu = new UI.Menu({
            backgroundColor: 'black',
            textColor: 'white',
            highlightBackgroundColor: 'white',
            highlightTextColor: 'black',
            status: {
              color: 'white',
              backgroundColor: 'black',
              separator: 'none',
            },
            sections: [{
              items: data
            }]
          });
          menu.on('select', function(e) {
            ajax({
              url: api_url, 
              type: 'json',
              method: 'post',
              data:{
                driver: 'pebble',
                id: e.item.id_on,
                api_key: api_key
                }
              },
              function(data) {
              },
              function(error) {
                console.log('Failed fetching data: ' + error);
              }
            );
          });
          menu.on('longSelect', function(e) {
            ajax({
              url: 'https://cmcs.cmtec.se/cmcs/json',
              type: 'json',
              method: 'post',
              data:{
                driver: 'pebble',
                id: e.item.id_off,
                api_key: api_key
                }
              },
              function(data) {
              },
              function(error) {
                console.log('Failed fetching data: ' + error);
              }
            );
          });
          menu.show();
        },
        function(error) {
          console.log('Failed fetching data: ' + error);
        }
      );
    });
    menu.show();
  },
  function(error) {
    console.log('Failed fetching data: ' + error);
  }
);