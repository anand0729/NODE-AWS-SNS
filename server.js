//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html#createTopic-property

const express = require('express')
const app = express()
const port = 3000

const AWS = require('aws-sdk');

//Set Version 
AWS.config.update({region: 'ap-south-1'});
const sns = new AWS.SNS({apiVersion: '2010-03-31'});


app.get('/crete_topic',(req,res)=>{
  var params = {
    Name: req.query.name, /* required */
    Attributes: {
      'DisplayName': req.query.name,      
    },
  };

  sns.createTopic(params, function(err, data) {
    if (err)  res.send(err.stack);
    else     res.send(data);        // successful response
  });
});

app.get('/subscribe_sms',(req,res)=>{

  var params = {
    Protocol: 'sms', 
    TopicArn: 'arn:aws:sns:ap-south-1:122525162576:Hrvite',  
    /* Attributes: {
      'attributeName': 'STRING_VALUE',
       
    }, */
    Endpoint: req.query.endpoint,
    /* ReturnSubscriptionArn: true || false */
  };
  sns.subscribe(params, function(err, data) {
    if (err) res.send(err.stack);
    else  res.send(data);        // successful response
  });
});

app.get('/sendSMS',(req,res)=>{

  var params = {
    Message: 'OTP To Login HRvite sample', 
    /* MessageAttributes: {
      'SenderID': {
        DataType: 'String',  
        StringValue: 'HRVITE' ,
      },
    }, */
    /*  PhoneNumber: '919943380729',  */
    Subject: 'OTP CHECK',
    /* TargetArn: '919943380729', */ //NO USE
    TopicArn: 'arn:aws:sns:ap-south-1:122525162576:Hrvite'
  };
  sns.publish(params, function(err, data) {
    if (err) res.send(err.stack);
    else  res.send(data);        // successful response
  });
});
























 /*  app.get('/sendSMS', (req, res) => {
      // Create publish parameters
      var params = {
        Message: 'TEST MSG',  
        TopicArn: 'aws:sns:ap-south-1:122525162576:hrvirte_sms'
      };

      

      // Create promise and SNS service object
      var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
      publishTextPromise.then(
        function(data) {
          console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
          console.log("MessageID is " + data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });

     
  }) */
 

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))