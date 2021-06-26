var socket = io("http://localhost:3000");

socket.on("server-senddki-thatbai", function () {
  alert("sai user(_ co nguoi check roi!!)");
});
socket.on("server-senddki-thanhcong", function (data) {
  $("#currentUser").html(data);
  $("#loginForm").hide(2000);
  $("#chatForm").show(1000);
});

socket.on("server-send-danhsach-user", function (data) {
  $("#boxContent").html();
  data.forEach(function (i) {
    $("#boxContent").append("<div class='user'>" + i + "</div>");
  });
});

socket.on("user-send-message", function (data) {
  $("#listMessage").append(
    "<div class='ms'>" + data.un + ":" + data.nd + "</div>"
  );
});

$(document).ready(function () {
  $("#loginForm").show();
  $("#chatForm").hide();
  $("#clickAPI").click(function () {
    socket.emit("client-send-username", $("#txtUsername").val());
    console.log($("#txtUsername").val());
  });
  $("#btnLogout").click(function () {
    socket.emit("logout");
    $("#chatForm").hide(2000);
    $("#loginForm").show(1000);
  });
  $("#btnSend").click(function () {
    socket.emit("user-send-message", $("#iputMess").val());
  });
});
