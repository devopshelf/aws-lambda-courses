var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-south-1'});

exports.handler = (event,context,callback) => {
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    if(event["params"]){
      var params = {
        TableName: 'courses',
        Key: {
          'courseId' : {S: event["params"]["courseId"]}
        }
      };
      ddb.getItem(params, function(err, data) {
        if (err) {
          let response = {
            "statusCode": 404,
            "body":err
          };
          //console.log("Error", err);
          throw new Error(JSON.stringify(response));
        } else {
          if(Object.keys(data).length > 0){
            console.log("result",data);
            let response = {
                "statusCode":200,
                "body":{
                  courseId:data["Item"]["courseId"]["S"],
                  name:data["Item"]["name"]["S"],
                  price:data["Item"]["price"]["S"],
                  url:data["Item"]["url"]["S"],
                  level:data["Item"]["url"]["S"]
                }
            };
            callback(null,response);
          }else{
            let response = {
            "statusCode": 404,
            "body": err
          };
            throw new Error(JSON.stringify(response));
          }
          //console.log("Success", data);
        }
      });
    }else{
      ddb.scan({TableName:"courses"}, function(err,data){
        if(err){
          let response = {
            statusCode: 400,
            body:err
          };
          callback(response);
        }
        let temp = []
        data["Items"].forEach(item => {
          temp.push(
            {
                courseId: item["courseId"]["S"],
                name:item["name"]["S"],
                price:item["price"]["S"],
                url:item["url"]["S"],
                level:item["level"]["S"]
            }
            )
        })
        
        let response = {
          statusCode: 200,
          body:temp
        };
        callback(null,response);
      });
    }
};

