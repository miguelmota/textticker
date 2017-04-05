# TextTicker

> A scrolling text ticker

## Demo

<img src="screenshot.gif" />

[http://lab.moogs.io/textticker](http://lab.moogs.io/textticker)

## Install

```bash
npm install textticker
```

## Usage

```javascript
var sayings = [
  'yippy yo',
  'badabing',
  'blahblah'
];

var index = 0;

var ticker = new TextTicker(document.querySelector('.text'), {
  text: sayings[0], // defaults to element text
  duration: 50, // default: 50
  leadChar: '_', // default: _
  leadCharKeep: true, // keep or remove lead character after done ticking. default: true
  leadCharBlink: 1000, // default: 1000
  leadCharBlink: 1000, // default: 1000
  leadCharMaxBlinks: Infinity, // default: Infinity
  startImediately: true, // default: true, if false then you must call ticker.start()
  onDone: function(text) {
    setTimeout(function() {
      var nextSaying = index <= 1 ? (index += 1, sayings[index]) : (index = 0, sayings[index]);
      ticker.setText(nextSaying);
      ticker.reload();
    }, 4000);
  }
});

ticker.destroy(); // stop ticking and set static text
```

## Resources

There is a terminal version available, [terminal-textticker](https://github.com/miguelmota/terminal-textticker).

# License

MIT
