var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

var mangUser = [];

io.on("connection", function (socket) {
  console.log("Có người kết nối: " + socket.id);

  socket.on("client-send-username", function (data) {
    // console.log(data);
    if (mangUser.indexOf(data) >= 0) {
      socket.emit("server-senddki-thatbai");
    } else {
      mangUser.push(data);
      socket.Username = data;
      socket.emit("server-senddki-thanhcong", data);
      io.sockets.emit("server-send-danhsach-user", mangUser);
    }
  });

  socket.on("logout", function () {
    mangUser.slice(mangUser.indexOf(socket.Username), 1);
    io.broadcast.emit("server-send-danhsach-user", mangUser);
  });
  socket.on("user-send-message", function (data) {
    io.sockets.emit("user-send-message", { un: socket.Username, nd: data });
  });
});

app.get("/devtestx", function (req, res) {
  res.render("trangchu");
});
