# TextTicker

A simple text ticker.

# Demo

[http://lab.moogs.io/textticker](http://lab.moogs.io/textticker)

# Install

```bash
bower install textticker
```

# Usage

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
  onDone: function(text) {
    setTimeout(function() {
      var nextSaying = index <= 1 ? (index += 1, sayings[index]) : (index = 0, sayings[index]);
      ticker.setText(nextSaying);
      ticker.reload();
    }, 4000);
  }
});
```

# License

MIT
