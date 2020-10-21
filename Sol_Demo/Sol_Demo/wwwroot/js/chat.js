"use strict";

// to Make SignalR connection. Step 1

var connection = new signalR
    .HubConnectionBuilder()
    .withUrl("/chathub")
    .withAutomaticReconnect()
    .build();

// Disable Send Button Step 2
$("#btnSendMessage").prop("disabled", true);

// Template for List Step 4
function templateList(message) {
    //console.log("Template :", user);
    //console.log("Template :", message);

    var template = `<li>myself  : ${message}</li>`;

    return template;
}

// SingnalR On connection, received message from Server. Step 3
connection.on("SendMessageToCallerJsMethod", function (message) {
    //console.log("On User :", user);
    //console.log("On Message :", message);

    var templateRender = templateList(message);

    console.log(templateRender);

    $("#messageList").append(templateRender);
});

// start the SingalR Connection / Step 5
connection
    .start()
    .then(function () {
        //console.log("Connection Start");
        $("#btnSendMessage").prop("disabled", false);
    })
    .catch(function (err) {
        console.log(err.toString());
        console.log("Error")
    });

// Invoke Message // Step 6

$("#btnSendMessage").click(function (event) {
    var message = $("#txtMessage").val();

    //console.log("Invoke User :", userName);
    //console.log("Invoke Message :", message);

    connection
        .invoke("SendMessage", message)
        .catch(function (err) {
            console.log(err.toString());
        });

    event.preventDefault();
});