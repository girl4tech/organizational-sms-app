const express = require('express');
const path = require('path');
const app = express()
const accountSid = '*******************************';
const authToken = '********************************';
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

var db

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

MongoClient.connect('mongodb://******:*************@ds155727.mlab.com:55727/****', (err, database) => {
  if (err) return console.log(err)
  db = database.db('list')
  app.listen(process.env.PORT || 5000, () => {
    console.log('Listening on 5000')})
})

// express()
  app.use(bodyParser.json()); // get information from html forms
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '/public')))
  app.set('views', path.join(__dirname, '/views'))
  app.set('view engine', 'ejs')


app.get('/send_message', (req, res) =>{

//scheduleing
//what DAY AND HOUR is it right now? - check the hour (not minutes)
//when send message?
// when now = send message time then (){run text command}
//since the shceduuer runs every hour, don't know when in the hour it could run. ()
//randomize tomorrow time (track date and hour) - let date check if message was sent or not
//when send it, randomize date for tomorrow



randomization

  fetch this from mongo
  message_history = {
    last_sent_date:undefined, // datestamp
    last_range_ceiling:9,
    sent_ids :{
      // current_week:['asdfadsf', 'asdfadf', 'adsfadf'],
      // last_week:['sdfhsdf','sdghgh', 'fghfgh']
      last_sent : function findDate(){
        var d = new Date();
        var n = d.getDate();
      }
    }

  }

  // when you get the message_history object form mongo
  // check the lenght of the current week array, and if it is 7
  // update last_week with current week and make current week empty
  // the proceed
  //


  // if(message_history.last_sent && now - last_sent > 8 && now is between 12 & 8){
  //
  //   if(math.random(message_history.last_range_ceiling) == 1 )
  //     send_message(message_history.sent_ids )
  //   else {
  //     message_history.last_range_ceiling -= 1
  //   }
  //
  // }


  // def send_message = function(history){
  //     // get all the tasks
  //     // combine three task list arrays into 1 flat array called tasks
  //     tasks.shuffle();
  //     for( task of tasks){
  //       // task might be
  //       // { id:adsfasdf, collection:list1, message:"hello there"}
  //       if( history.current_week.indexOf(task.id) > -1 &&
  //           history.last_week.indexOf(task.id) > -1 ){
  //             client.messages
  //               .create({
  //                 to: '+14402926252',
  //                 from: '+14407403792',
  //                 body: task.message
  //               })
  //               .then(message => console.log(message.sid));

           //actually send message
           // update messsage history in mongo
             // add id of task we just sent to the sent_message_current_week Array
             // reset last_range_ceiling to 9
             // update the last_sent_date to now


//            break;
//          }
//       }
//   }
//
//
//
// })

  app.get('/', (req, res) => {

    let _res = {
      list1:[],
      list2:[],
      list3:[]
    }

    let _promises = []


    for(list of ['list1', 'list2', 'list3']){
      _promises.push(db.collection(list).find().toArray())
    }

    Promise.all(_promises).then((collections)=>{
      for(collection of collections){
        if(collection.length > 0){
          if(collection[0].collection_id){
            let collection_id = collection[0].collection_id
            _res[collection_id] = collection
          }
        }
      }
      res.render('index.ejs', _res)
    })

  })

  app.post('/add_item', (req, res) => {
    // req =
    // {...
    //  body: {
    //   'name': text,
    //   'collection':collection
    //  }
    // }
    console.log(req.body)
    db.collection(req.body.collection_id).save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.status(200).send()
  })
})

app.delete('/delete', (req, res) => {
  console.log(req.body.name)
  db.collection(req.body.collection_id).findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.put('/update', (req, res) => {
  // db.collection("list1").findOneAndUpdate(
  //   {
  //     simpleId: "8550aa8c-09cf-471e-a96f-a176a85af54f" },
  //     { $set: { name: "sfdsfd" }},
  //     (err, result) => { if (err) return res.send(err)
  //      res.send(result)
  //})
  db.collection(req.body.collection_id).findOneAndUpdate(
    {
      simpleId: req.body.simpleId},
      { $set: { name: req.body.name }},
      (err, result) => { if (err) return res.send(err)
       res.send(result)
  })
})
