var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   '111'
});

var db = server.use('o2');
var rec = db.record.get('#21:0')
   .then(
      function(record){
         console.log('Loaded Record:', record);
       }
   );