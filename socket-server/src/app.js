const express = require('express');
const bodyParser = require('body-parser');
const app1 = express();
// app1.use(bodyParser.json({strict: false}));

// app1.get('/', (request, response) =>  response.send(`hello!`));

// app1.listen(3000, () => console.info('Application running on port 3000'));

// app1.post('/api/data', (request, response) => {
//   var postBody = request.body;
//   response.send("data received");
//   postBody.order.details.accept = 0
//   var json = postBody;
//   documents[postBody.order.details.id] = json;
//   console.log(documents);
//   io.emit("documents", Object.values(documents));
//   });

//   app1.post('/api/order', (request, response) => {
//     var postBody = request.body;
//     response.send("data received");
//     postBody.order.details.accept = 0
//     var json = postBody;
//     documents[postBody.order.details.id] = json;
//     console.log(documents);
//     io.emit("Orders", Object.values(documents));
//     });
/////
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const documents = [];
const orders = [];

io.on("connection", socket => {
    let previousId;
    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };
  
    socket.on("getDoc", docId => {
      safeJoin(docId);
      socket.emit("document", documents[docId]);
    });
  
    socket.on("addDoc", doc => {
      documents[doc.order.details.id] = doc;
      safeJoin(doc.id);
      socket.emit("document", doc);
    });
  
    socket.on("editDoc", doc => {
      documents[doc.order.details.id] = doc;
      socket.to(doc.id).emit("document", doc);
    });

    socket.on("changeSts", doc => {
      orders[doc.Id] = doc;
      io.emit("Orders",Object.values(orders));
    });

    socket.on("Orders", doc => {
      orders[doc.Id] = doc;
      io.emit("Orders",Object.values(orders));
    });
    io.emit("Orders",Object.values(orders));
    io.emit("documents", Object.values(documents));
  });

  http.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 4444');
});