//$(document).ready(function () {

//Elements
var resA;
var resB;
var table = $(".table-holder table tbody");
var lastRow = $(".table-holder table tbody tr:last");
var lastRowTd;
var tr = $("<tr></tr>");
var currentScoreA;
var currentScoreB;
var gamesA = 0;
var gamesB = 0;

$("#startGame").click(function () {
    $(this).hide();
    $("#addTeams").fadeIn();
});

$("#register").click(function () {
    var teamA = $("#teamA-playerOne").val() + " " + $("#teamA-playerTwo").val();
    var teamB = $("#teamB-playerOne").val() + " " + $("#teamB-playerTwo").val();
    $("#addTeams").hide();
    $(".table-holder").fadeIn();
    $("#teamA").html(teamA);
    $("#teamB").html(teamB);
});

function resetFields() {
    $("#addResult-A").val("");
    $("#addResult-B").val("");
}

$("#enter").on("click", function () {

    resA = $("#addResult-A").val();
    resB = $("#addResult-B").val();

    if ($.isNumeric(resA) && $.isNumeric(resB) && resA > -1 && resB > -1 && resA % 1 == 0 && resB % 1 == 0) {

        if ($(".table-holder table tbody tr:last").length == 0) {

            $(".table-holder table tbody").append(tr);
            $(".table-holder table tbody tr").eq(0);
            $(".table-holder table tbody tr:last").append('<td>' + resA + '</td>');
            $(".table-holder table tbody tr:last").append('<td>' + resB + '</td>');
            //Reset inputs
            resetFields();

        } else {

            $(".table-holder table tbody tr:last td").eq(0).append(' - ' + resA);
            $(".table-holder table tbody tr:last td").eq(1).append(' - ' + resB);

            //Calculate

            //Team A current score
            currentScoreA = $(".table-holder table tbody tr:last td").eq(0).html().split("-");
            currentScoreA = (parseInt(currentScoreA[0]) + parseInt(currentScoreA[1]));

            //Team B current score
            currentScoreB = $(".table-holder table tbody tr:last td").eq(1).html().split("-");
            currentScoreB = (parseInt(currentScoreB[0]) + parseInt(currentScoreB[1]));

            //Append new row
            $(".table-holder table tbody tr:last").after('<tr><td>' + currentScoreA + '</td><td>' + currentScoreB + '</td></tr>');

            //Check if the game is over
            if ($(".table-holder table tbody tr:last td").eq(0).html() >= 150 || $(".table-holder table tbody tr:last td").eq(1).html() >= 150) {
                if (parseInt($(".table-holder table tbody tr:last td").eq(0).html()) > parseInt($(".table-holder table tbody tr:last td").eq(1).html())) {

                    //Check if the last call was capot
                    if (parseInt($("#addResult-B").val()) !== 0) {
                        //Increment current game scores and append it in the  score table
                        gamesA++;
                        console.log('Team A:' + gamesA);
                        console.log($(".table-holder table tbody tr:last td").eq(1).html());
                        $("#gameScoreA ").html(gamesA);
                        $(".table-holder table tbody").html("<tr><td>0</td><td>0</td></tr>");
                        //Reset inputs
                        resetFields();
                    } else {
                        //Reset inputs
                        resetFields();
                        return;
                    }
                } else {

                    //Check if the last call was capot
                    if (parseInt($("#addResult-A").val()) !== 0) {
                        //Increment current game scores and append it in the  score table
                        gamesB++;
                        console.log('Team B:' + gamesB);
                        $("#gameScoreB").html(gamesB);
                        $(".table-holder table tbody").html("<tr><td>0</td><td>0</td></tr>");
                        //Reset inputs
                        resetFields();
                    } else {
                        //Reset inputs
                        resetFields();
                        return;
                    }
                }
            }
        }

        //Reset inputs
        resetFields();

    } else {
        alert("Позволени символи са само цели числа по-големи от 0");
    }

});


window.onbeforeunload = function () {
    return "Data will be lost if you leave the page, are you sure?";
};


//});