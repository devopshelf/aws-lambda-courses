var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-south-1'});

exports.handler = (event,context,callback) => {
    //callback(null,event["name"]);
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
   
      let params = {
        TableName: 'courses',
        Item: {
          'courseId' : {S: event["courseId"]},
          'name': {S: event["name"]},
          'url':{S: event["url"]},
          'price': {S: event["price"]},
          'level':{S: event["level"]}
        }
      };
      
      ddb.putItem(params, function(err, data) {
      if (err) {
        //console.log("Error", err);
        callback(err);
      } else {
        callback(null,data);
        //console.log("Success", data);
      }
    });
};
