(function() {
  var sayings = [
    'Programs must be written for people to read, and only incidentally for machines to execute.',
    'Keep away from people who try to belittle your ambitions. Small people always do that, but the really great make you feel that you, too, can become great.',
    'Change breaks the brittle.'
  ];

  var index = 0;

  var ticker = new TextTicker(document.querySelector('.text'), {
    text: sayings[0],
    duration: 50,
    leadChar: '_',
    leadCharBlink: 1000,
    leadCharKeep: true,
    onDone: function(text) {
      setTimeout(function() {
        var nextSaying = index <= 1 ? (index += 1, sayings[index]) : (index = 0, sayings[index]);
        ticker.setText(nextSaying);
        ticker.reload();
      }, 4000);
    }
  });
})();
