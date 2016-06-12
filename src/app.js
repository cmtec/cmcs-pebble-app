/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

var menu_items = [{title: 'Tv On', subtitle: 'Living room', id: '37cc-439e-98de-3fe555f6ecce'},{title: 'TV Off', subtitle: 'Living room', id: 'd161-4e87-aa07-de340813b7ce'}];

var menu = new UI.Menu({
sections: [{
  items: menu_items
}]
});
menu.on('select', function(e) {
    var URL = 'https://cmcs.cmtec.se/cmcs/trigger?id=' + e.item.id; 
    ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log('Successfully fetched weather data!');
  },
  function(error) {
    // Failure!
    console.log('Failed fetching weather data: ' + error);
  }
);
});
  menu.show();