$(document).ready(
    function () {
        $("#reviews-box").html("");

        showReview();
    });


function makeReview() {
    let day = $("#day").val();
    let routine = $("#routine").val();
    let comment = $("#comment").val();

    if (day == "") {
        alert("날짜를 입력해주세요");
        $("#day").focus();
        return;
    } else if (routine == "") {
        alert("루틴을 입력해주세요");
        $("#routine").focus();
        return;
    } else if (comment == "") {
        alert("내용을 입력해주세요");
        $("#comment").focus();
        return;
    }

    $.ajax({
        type: "POST",
        url: "/review",
        data: {
            day_by_client: day,
            routine_by_client: routine,
            comment_by_client: comment
        },
        success: function (response) {
            if (response["result"] == "success") {
                alert(response["msg"]);
                window.location.reload();

            }
        }


    })


}


function showReview() {
    $.ajax({
        type: "GET",
        url: "/review",
        data: {},
        success: function (response) {
            if (response["result"] == "success") {

                let daily = response["reviews"];

                for (let i = 0; i < daily.length; i++) {


                    let temphtml = `<tr>
                                      <th scope="row">${daily[i]["day"]}</th>
                                      <td>${daily[i]["routine"]}</td>
                                       <td colspan="2" id="text">${daily[i]["comment"]}</td>
                                      </tr>`

                    $("#review-box").append(temphtml)
                }


                else{
                    alert("일지를 받아오지 못했습니다.");
                }


            }


        }


    })


}
function validateLength(obj) {
            let content = $(obj).val();
            if (content.length > 140) {
                alert("일는 140자까지 기록할 수 있습니다.");
                $(obj).val(content.substring(0, content.length - 1));
            }
        }











