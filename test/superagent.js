var superagent = require('superagent');

superagent
  .get('https://api.lgdjwc.com/v1/room-schedule?location_id=1&building_id=10&week=4&week_day=4')
  .timeout(3000000)
  .end(function(err, res) {
    if (err) {
    	console.log(err);
    }
    var result = res.body;
    console.log(result);
    // return callback(null, result);
  });