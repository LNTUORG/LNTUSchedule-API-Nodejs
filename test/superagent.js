var superagent = require('superagent');

superagent
  .get('https://api.lgdjwc.com/v1/room-schedule?location_id=3&building_id=6&week=1&week_day=1')
  .timeout(3000000)
  .end(function(err, res) {
    if (err) {
    	console.log(err);
    }
    var result = res.body.results;


    result.sort(by("name"));
    console.log(result);
    // return callback(null, result);
  });


var by = function(name){
  return function(o, p){
    var a, b;
    if (typeof o === "object" && typeof p === "object" && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    }
    else {
      throw ("error");
    }
  }
}