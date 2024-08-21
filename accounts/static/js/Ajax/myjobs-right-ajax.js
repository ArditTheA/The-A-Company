
document.getElementById("interview-content").innerText = "Schedule the meeting here:";

function showElements1(shouldShowLeftJobs) {
    const elementsToShow = shouldShowLeftJobs ? '.job-left, .profileHeader, .header-wishes, .jobs-buttons' : '.right-jobs, .right-jobs-main-div';

    if (window.matchMedia('(max-width: 480px)').matches) {
        if (shouldShowLeftJobs) {
            $('.profileHeader').css("display", "flex")
            $('.job-left, .header-wishes, .jobs-buttons').show();
            $('.right-jobs, .right-jobs-main-div').hide();
        } else {
            $('.job-left, .profileHeader, .header-wishes, .jobs-buttons').hide();
            $('.right-jobs, .right-jobs-main-div').show();
        }
    } else {
        $(elementsToShow).show();
    }
}

$('.myjob-right-exit').click(function () {
    showElements1(true);
});

// Handle popstate for mobile
window.addEventListener('popstate', function (event) {
    if (event.state !== null) {
        showElements1(event.state.showJobLeft);
    }
});

// Initial setup based on the screen width
if (window.matchMedia('(max-width: 480px)').matches) {
    showElements1(true); // Ensure right jobs are initially hidden on mobile

    initialize();
} else {
    $(document).ready(initialize);
}

// Additional code to handle initial history state
window.addEventListener('load', function () {
    showElements1(history.state && history.state.showJobLeft !== true);
    // nese scheduledUserIds e permban id-ne e userit aktual, i bjen qe ky user ka bo appointment, keshtu qe shfaqja mesazhin e jo kalendarin.
    // nese scheduledUserIds nuk e permban id-ne e userit aktual, i bjen qe ky user nuk ka bo appointment, keshtu qe thirre loadCalendlyn per mja shfaq kalendarin.
    if (data["usersWithAppointments"].id) {
        document.getElementById("meet-with-us").innerHTML = `
        <p>Appointment details:</p>
        <p id="date-meeting">Date: ${data["usersWithAppointments"].meetingDate}</p>
        <p id="time-meeting">Time: ${data["usersWithAppointments"].meetingTime}</p>
        <a href="${data["usersWithAppointments"].meetingLink}" target="_blank">Join the meeting here</a>
    `;
        $(".completed-meet-with-us-phase").css("display", "block");

    }
     // under <a href="${data["usersWithAppointments"].meetingLink}" target="_blank">Join the meeting here</a>  //
    // <p>Please check your email for further instructions.</p>

    else {
        document.getElementById("meet-with-us").innerHTML = "";
        loadCalendly();
        $(".completed-meet-with-us-phase").css("display", "none");

    }
});

function loadCalendly() {
    Calendly.initInlineWidget({
        url: 'https://calendly.com/worki-global/worki-demo?hide_event_type_details=1&hide_gdpr_banner=1',
        parentElement: document.getElementById('meet-with-us'),
        prefill: {},
        utm: {}
    });
}

async function getMyJobs(id, show = 0) {    

    // document.getElementById("checkout").innerHTML = ""
    var elements = document.getElementsByClassName('pixel'); // get all elements

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "white";
    };

    post_id = id;
    $("#current-job-id").val(id)


    var response = await fetch('/my-jobs/get-job-details/', {

        method: "get",

        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            text: post_id,
        }

    }

    );

    let data = await response.json();

    console.log(data)


    // if (data["country"][0] === "USA") {
    //     console.log("Country");
    //     $(".payment-form-content").css("display", "block");
    //     $(".payment-div").css("display", "block");
    //     $(".meet-with-us-div").css("display", "flex");
    //     // $(".meet-us-form-content").css("display", "none");
    // }
    // else {
    //     $(".payment-form-content").css("display", "none");
    //     $(".payment-div").css("display", "none");
    //     $(".meet-with-us-div").css("display", "none");
    //     $(".meet-us-form-content").css("display", "none");
    // }

    if (data["usersWithAppointments"].id) {
        document.getElementById("interview-content").innerText = "Interview";
        document.getElementById("meet-with-us").innerHTML = `
        <div style="width: 100%;">
            <div style="display: flex; justify-content: space-between;">
                <div style="display: flex;">
                <img src="/static/img/interview-date-icon.svg" alt="Interview Date Icon">
                <div class="main-divs-color date-time-color interview-distance-between-div-img" id="date-meeting">${data["usersWithAppointments"].meetingDate}</div>
                </div>
                <div style="display: flex;">
                <img src="/static/img/interview-time-icon.svg" alt="Interview Time Icon">
                <div class="main-divs-color date-time-color interview-distance-between-div-img" id="time-meeting">${data["usersWithAppointments"].meetingTime}</div>
                </div>
                <div style="display: flex;">
                <img src="/static/img/interview-link-icon.svg" alt="Interview Link Icon">
                <a class="interview-distance-between-div-img" href="${data["usersWithAppointments"].meetingLink}" target="_blank">Interview link</a>
                </div>
            </div>
        </div>
    `;

    // <div>Please check your email for further instructions.</div>


    document.querySelectorAll(".payment-div").forEach(a => {
        a.style.pointerEvents = "none";
    })

    if (data["usersWithAppointments"].meetingDone) {
        $(".completed-meet-with-us-phase").css("display", "block");
        document.querySelectorAll(".payment-div").forEach(a => {
            a.style.pointerEvents = "visible";
        });
        
    }
    else {

        document.querySelectorAll(".payment-div").forEach(a => {
            a.style.pointerEvents = "visible";
        })
        $(".completed-meet-with-us-phase").css("display", "none");
        }

    }
    else {
        document.getElementById("interview-content").innerText = "Schedule the meeting here:";
        document.getElementById("meet-with-us").innerHTML = "";
        loadCalendly();
        $(".completed-meet-with-us-phase").css("display", "none");

    }

    // response ma nelt duhet mi kthy edhe ni field tjeter: scheduledUserIds, e cila eshte nje array qe i ka id-te e krejt userave te cilet kane bo appointment per kete job.
    // nese scheduledUserIds e permban id-ne e userit aktual, i bjen qe ky user ka bo appointment, keshtu qe shfaqja mesazhin e jo kalendarin.
    // nese scheduledUserIds nuk e permban id-ne e userit aktual, i bjen qe ky user nuk ka bo appointment, keshtu qe thirre loadCalendlyn per mja shfaq kalendarin.

    if (data["StatusApp"] === "Qualified") {

        if (data["user_document"] === 4) {
            document.querySelectorAll(".completed-documents-for-work-permit-phase").forEach(element => {
                element.style.display = "block";

            });

            if (data["phase_second_main"] != 2) {
                document.querySelectorAll(".second-progress-phase_myjobs").forEach(element => {
                    element.style.display = "block";

                });
            }

        }
        else {
            document.querySelectorAll(".progress-phase_myjobs").forEach(element => {
                element.style.display = "block";

            });
            document.querySelectorAll(".second-progress-phase_myjobs").forEach(element => {
                element.style.display = "none";

            });

        }
        if (data["phase_second_main"] === 2) {
            if (data["user_document"] === 4) {
                document.querySelectorAll(".completed-your-work-permit-phase").forEach(element => {
                    element.style.display = "block";
                });
            }
            else {
                document.querySelectorAll(".completed-your-work-permit-phase").forEach(element => {
                    element.style.display = "none";
                });
                document.querySelectorAll(".second-progress-phase_myjobs").forEach(element => {
                    element.style.display = "none";

                });
            }

        }
    }
    else {
        document.querySelectorAll(".completed-documents-for-work-permit-phase").forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll(".completed-your-work-permit-phase").forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll(".second-progress-phase_myjobs").forEach(element => {
            element.style.display = "none";

        });
    }

    if (show === 1) {
        $(".application-update-form-content").css("display", "none");
        $(".documents-for-work-permit-form-content").css("display", "block");
        $(".your-work-permit-is-here-form-content").css("display", "none");
    } else if (show == 2) {
        $(".application-update-form-content").css("display", "none");
        $(".documents-for-work-permit-form-content").css("display", "none");
        $(".your-work-permit-is-here-form-content").css("display", "block");
    }
    else {
        // if (data["country"][0] === "Dominican Republic") {
        $(".meet-us-form-content").css("display","none");
        $(".payment-form-content").css("display","none");
        $(".application-update-form-content").css("display", "block");
        $(".documents-for-work-permit-form-content").css("display", "none");
        $(".your-work-permit-is-here-form-content").css("display", "none");
        $(".payment-div").css("display", "block");
        $(".meet-with-us-div").css("display", "flex");
        // }
        // else {
        //     $(".payment-form-content").css("display", "none");
        //     $(".application-update-form-content").css("display","block");
        //         $(".meet-us-form-content").css("display","none");
        //     $(".payment-div").css("display", "none");
        //     $(".meet-with-us-div").css("display", "none");
        //     $(".meet-us-form-content").css("display", "none");

        // }
    }
    if (data["StatusApp"]) {
        if (data["StatusApp"] != "Qualified") {
            document.querySelectorAll(".block-this").forEach(newElement => {
                newElement.style.display = "none";
            })
            document.querySelectorAll(".completed-application-update-phase").forEach(newElement => {
                newElement.style.display = "none";
            })

            $(".payment-form-content").css("display", "none");
            $(".payment-div").css("display", "none");
            $(".meet-with-us-div").css("display", "none");
            $(".meet-us-form-content").css("display", "none");
            $(".payment-form-content").css("display", "none");
            $(".application-update-form-content").css("display", "block");
            $(".second-screening-question-div").css("pointer-events", "none");

        } else {
            document.querySelectorAll(".block-this").forEach(newElement => {
                newElement.style.display = "block";
            })
            document.querySelectorAll(".completed-application-update-phase").forEach(newElement => {
                newElement.style.display = "block";
            })

        }
    }
    $("#user_id").val(data["userid"]);


    function isCalendlyEvent(e) {
        return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
    }

    // Event listener for messages from Calendly
    window.addEventListener("message", function (e) {
        if (isCalendlyEvent(e)) {
            // Log the event name and payload (optional for debugging)
            // console.log("Event name:", e.data.event);
            // console.log("Event details:", e.data.payload); // Log the payload to the console

            // Check if the event is 'calendly.event_scheduled'
            if (e.data.event === "calendly.event_scheduled") {
                const eventData = e.data.payload;
                console.log("Extracted Event Data:", eventData); // Log the extracted data
                var token = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzE3MDYwOTI1LCJqdGkiOiIzOTBhNWJkOC0xMmQyLTQ4ODEtOWI3Yi04Zjk4NWUxNjk5MjUiLCJ1c2VyX3V1aWQiOiJlOWI4ZTJiMC00NzU2LTQxOWItYmE2MS00ZDRkMThiODExN2MifQ.zcXuM9cWfpFvST48aljZTDUyDvgy7tZ6uVQ-6sgTLg94u0wlu7Pe47YCyYzHrzPYWTXm_iExA6EckJYxiMB-_A'; // Replace with your actual Bearer token
                $.ajax({
                    url: eventData.event.uri, // Example API endpoint
                    method: 'GET',
                    dataType: 'json',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    success: function (response) {
                        let apiResponse = response.resource;

                        // Create a Date object from the start_time
                        let startDateTime = new Date(apiResponse.start_time);

                        // Format the date as 'Month Day, Year' (e.g., 'June 10, 2024')
                        let optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
                        let formattedDate = startDateTime.toLocaleDateString(undefined, optionsDate);

                        // Format the time as 'HH:MM AM/PM' (e.g., '12:30 PM')
                        let optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
                        let formattedTime = startDateTime.toLocaleTimeString(undefined, optionsTime);

                        let meetingLink = apiResponse.location.join_url

                        // Qetu e thirr ni python endpoint e cila e run ne databaze ni record me jobId, userId (psh: ne nje tabele te re qe quhet user_job_appointments (userId, jobId))
                        $.ajax({
                            type: "POST",
                            url: '/user_job_appointments/',
                            data: {
                                job_id: id,
                                user_id: data["userid"],
                                meetingDate: formattedDate,
                                meetingTime: formattedTime,
                                meetingLink: meetingLink,
                            },
                        })
                        // console.log("API Response:", response); // Log the response for debugging\
                        // console.log("Start Time:", response.resource.start_time); // Log the response for debugging\
                        // console.log("End Time:", response.resource.end_time); // Log the response for debugging\
                        document.getElementById("meet-with-us").innerHTML = `
                                <p>Your meeting has been successfully scheduled.</p>
                                <p id="date-meeting">Date: ${formattedDate}</p>
                                <p id="time-meeting">Time: ${formattedTime}</p>
                                <a href="${meetingLink}" target="_blank">Join the meeting here</a>
                            `;
                        $(".completed-meet-with-us-phase").css("display", "block");

                    }
                        // this is under <a href="${meetingLink}" target="_blank">Join the meeting here</a>
                    // <p>Please check your email for further instructions.</p>

                });



                // Change the content of the div
            }
        }
        else {
            $(".block-this").forEach(element => {
                element.style.display = 'none';
            });
        }
    });

    // document.getElementById("time-meeting").innerHTML = data["meetingTime"]
    // document.getElementById("meeting-link").innerHTML = data["meetingLink"]

    // console.log(data["meetingTime"])

    // document.getElementById('meet-with-us').innerHTML = data["meetWithUs"];





    // 
    // document.getElementById("meet-with-us") = data["meetingTime"];

    // Docs
    var newDiv1 = "";
    var newDiv2 = "";
    var newDiv3 = "";
    var newDiv4 = "";
    var newDiv5 = "";
    var newDiv6 = "";
    var newDiv7 = "";
    var beforeNewDiv2 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadDocForWorkPermitFolder(' + data["useremail"] + ')">';

    $('.parent-img-zip').empty();
    $('.parent-img-zip').append(beforeNewDiv2);

    // Documents
    var newDiv = '<input type="hidden" id="applicantID">';
    if (data["passaportExists"] === true) {
        if (data["passaportStatus"] === "A") {
            newDiv1 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +

                '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +

                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +

                '</div>' +
                '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Government issued travel document</div>' +
                '</div';
        } else if (data["passaportStatus"] === "R") {
            newDiv1 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color ">Passport</div>' +

                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +

                '<img style="display: block;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +

                '</div>' +
                '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Government issued travel document</div>' +
                '</div';
        } else {
            newDiv1 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +

                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +

                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +

                '</div>';
        }
    } else {
        newDiv1 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
            '<img class="img-done" src="/static/img/before-done-img.svg">' +
            '<img class="img-fail" src="/static/img/img-fail.svg">' +
            '</div>' +
            '</div>' +
            '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Government issued travel document</div>' +
            '</div>';
    }

    if (data["studentStatusExists"] === true) {
        if (data["studentStatus"] === "A") {
            newDiv2 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Student Status</div>' +
                '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +

                '</div>' +
                '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
                '</div';
        } else if (data["studentStatus"] === "R") {
            newDiv2 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color ">Student Status</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: block;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +

                '</div>' +
                '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
                '</div';

        } else {
            newDiv2 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Student Status</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +

                '</div>';
        }
    } else {
        newDiv2 = '<div class="" style="padding-bottom: 20px;">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div id="passport" class="main-divs-color mutual-titles-color">Student Status</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +

            '</div>' +
            '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Official confirmation of enrollment in a university</div>' +
            '</div>' +
            '</div>';
    }

    if (data["certificateOfEnrolmentExists"] === true) {
        if (data["certificateStatus"] === "A") {
            newDiv3 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>' +
                '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +

                '</div>' +
                '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
                '</div';
        } else if (data["certificateStatus"] === "R") {
            newDiv3 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color ">Certificate of Enrolment</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: block;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="3" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +

                '</div>' +
                '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
                '</div';
        }
        else {
            newDiv3 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +

                '</div>';
        }
    } else {
        newDiv3 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="3" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +

            '</div>' +
            '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
            '</div>' +
            '</div>';
    }

    if (data["studentIdExists"] === true) {
        if (data["studentIdStatus"] === "A") {
            newDiv4 = '<div class="" style="";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Student ID</div>' +
                '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="4" title="Download Student ID" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +

                '</div>' +
                '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Official identification card issued by a university</div>' +
                '</div';
        }

        else if (data["studentIdStatus"] === "R") {
            newDiv4 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color ">Student ID</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: blockx;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="4" title="Upload Student ID" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +

                '</div>' +
                '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Official identification card issued by a university</div>' +
                '</div';

        }
        else {
            newDiv4 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Student ID</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="4" title="Download Student ID" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +

                '</div>';
        }

    } else {
        newDiv4 = '<div class="" style="";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div class="main-divs-color mutual-titles-color">Student ID</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="4" title="Upload Student ID" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
            '<img class="img-done" src="/static/img/before-done-img.svg">' +
            '<img class="img-fail" src="/static/img/img-fail.svg">'
            +
            '</div>' +
            '</div>' +
            '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Official identification card issued by a university</div>' +
            '</div';
    }


    // if(data["photoExists"] === true){
    //     if(data["photoStatus"] === "A"){
    //         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //                         '<div class="docs-nike-fails" style="display: flex;">' +
    //                         '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
    //                         '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //                         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //                         '</div>' +
    //                         '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +


    //                 '</div>';
    //     }
    //     else if(data["photoStatus"] === "R"){
    //         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //                         '<div class="docs-nike-fails" style="display: flex;">' +
    //                         '<div class="main-divs-color mutual-titles-color">Photo</div>' +
    //                         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //                         '<img style="display: block;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //                         '</div>' +
    //                         '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +


    //                 '</div>';
    //     }else{
    //         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //                         '<div class="docs-nike-fails" style="display: flex;">' +
    //                         '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
    //                         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //                         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //                         '</div>' +
    //                         '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +


    //                 '</div>';
    //     }

    // }else{
    //     var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //                         '<div class="docs-nike-fails" style="display: flex;">' +
    //                         '<div class="main-divs-color mutual-titles-color">Photo</div>' +
    //                         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //                         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //                         '</div>' +
    //                     '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
    //                     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //                         '<img class="img-done" src="/static/img/before-done-img.svg">' +
    //                         '<img class="img-fail" src="/static/img/img-fail.svg">'
    //                          +
    //                     '</div>'

    //                 '</div>';

    // }
    // url = "/download-cv/"+id    

    // if(data["ResumeStatus"] === "A"){
    //     var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //     '<div class="docs-nike-"fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
    //         '<img style="display:;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +
    //         '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
    //     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(6);">' +
    //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(6);">'
    //             +
    //         '</div>'
    //     '</div>';
    // }else if(data["ResumeStatus"] === "R"){
    //     var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //     '<div class="docs-nike-"fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color">Resume</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +
    //         '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
    //     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(6);">' +
    //         '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(6);">'
    //             +
    //         '</div>'
    //     '</div>';
    // }
    // else{
    //     var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //     '<div class="docs-nike-"fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +
    //     '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
    //     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(6);">' +
    //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(6);">'
    //             +
    //         '</div>'
    //     '</div>';
    // }
    // if(data["serviceContractExists"] === true){
    //     if(data["serviceContractStatus"] === "A"){
    //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  ">' +
    //         '<div class="docs-nike-fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color blue-text">Service Contract</div>' +
    //         '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +  
    //         '<img data-number="7" title="Download Service Contract" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +


    //     '</div>';
    //     }else if(data["serviceContractStatus"] === "R"){

    //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
    //         '<div class="docs-nike-fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color ">Service Contract</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +  
    //         '<img data-number="7" title="Upload Service Contract"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +


    //         '</div>';
    //     }else{
    //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
    //         '<div class="docs-nike-fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color blue-text">Service Contract</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +  
    //         '<img data-number="7" title="Download Service Contract" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +


    //     '</div>';
    //     }
    // }

    //     else {
    //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
    //         '<div class="docs-nike-fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color">Service Contract</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +   
    //         '<img data-number="7" title="Upload Service Contract"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +

    //     '</div>'
    //         }


    $('#documentList').empty();
    // Append the new div elements to the documentList
    $('#documentList').append(newDiv, newDiv1, newDiv2, newDiv3, newDiv4);


    var newDiv8 = ""
    var newDiv9 = ""
    if (data["jobOfferExists"] === true) {
        if (data["jobOfferStatus"] === "A") {
            var newDiv8 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this); jobOffer(this)" class="open-popup job-offer-click" src="/static/img/documents-second-icon.svg" alt="">' +


                '</div>';
        } else if (data["jobOfferStatus"] === "R") {
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color ">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +


                '</div>';
        } else {
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +


                '</div>';
        }
    } else {
        var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  padding-bottom:20px; ">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div class="main-divs-color mutual-titles-color">Job Offer </div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +

            '</div>'
    }
    if (data["workPermitExists"] === true) {
        if (data["workPermitStatus"] === "A") {
            var newDiv9 = '<div class="" style="";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="9" title="Download Work Permit" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +


                '</div>';
        }
        else if (data["workPermitStatus"] === "R") {
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color ">Work Permit</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="9" title="Upload Work Permit"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +


                '</div>';
        } else {
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="9" title="Download Work Permit" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +


                '</div>';
        }

    }
    else {
        var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  padding-bottom:20px; ">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div class="main-divs-color mutual-titles-color">Work Permit </div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="9" title="Upload Work Permit"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +

            '</div>'
    }
    var beforeNewDiv1 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadWorkPermitFolder(' + data["useremail"] + ')">';
    $('#recdocumentList').empty();
    $("#parent-img-zip2").empty();
    $("#parent-img-zip2").append(beforeNewDiv1)
    $('#recdocumentList').append(newDiv8, newDiv9);


    var beforeNewDiv3 = '<img class="imgs-three-dots-zip-img three-dots-document" style="" src="/static/img/Three-dots.svg">';
    var downloadUrl = '/download_user_folder/' + id;
    var beforeNewDiv4 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadWorkPermitFolder(' + "'" + data["email"] + "'" + ')">';

    $('#recdocumentList').empty();
    $("#parent-img-zip2").empty();
    $("#parent-img-zip2").append(beforeNewDiv3, beforeNewDiv4)
    $('#recdocumentList').append(newDiv8, newDiv9);


    

    if (data["jobOfferExists"] === true) {
        if (data["jobOfferStatus"] === "A") {
            var newDiv10 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(8);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(8);">'
                +
                '</div>'

            '</div>';
        } else if (data["jobOfferStatus"] === "R") {
            var newDiv10 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div style="width: 75px;" class="main-divs-color mutual-titles-color ">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(8);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(8);">'
                +
                '</div>'

            '</div>';
        } else {
            var newDiv10 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(8);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(8);">'
                +
                '</div>'

            '</div>';
        }
    } else {
        var newDiv10 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  padding-bottom:20px; ">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div style="width: 75px;" class="main-divs-color mutual-titles-color">Job Offer </div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
            '<img class="img-done" src="/static/img/before-done-img.svg">' +
            '<img class="img-fail" src="/static/img/img-fail.svg">'
            +
            '</div>'
        '</div>'
    }

    var beforeNewDiv5 = '<img class="imgs-three-dots-zip-img three-dots-document" style="" src="/static/img/Three-dots.svg">';
    var downloadUrl = '/download_user_folder/' + id;
    // var beforeNewDiv6 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadWorkPermitFolder(' + "'" + data["email"] + "'" + ')">';

    $('#jobofferdocumentList').empty();
    $("#parent-imgZip2").empty();
    $("#parent-imgZip2").append(beforeNewDiv5);
    $('#jobofferdocumentList').append(newDiv10);

    var beforeNewDiv6 = '<img class="imgs-three-dots-zip-img three-dots-document" style="" src="/static/img/Three-dots.svg">';
    var beforeNewDiv7 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadDocForWorkPermitFolder(' + data["email"] + ')">';

    $('.visa-documents-parent-img-zip').empty();
    $('.visa-documents-parent-img-zip').append(beforeNewDiv6, beforeNewDiv7);
    var newDiv11 = "";
    var newDiv12 = "";
    var newDiv13 = "";
    var newDiv14 = "";
    var newDiv15 = "";
    var newDiv16 = "";
    var newDiv17 = "";
    var newDiv18 = "";
    var newDiv19 = "";
    var newDiv20 = "";
    // Documents
    // var newDiv111 = '<input type="hidden" id="applicantID">';
    // if (data["passaportExists"] === true) {
    if (data[""] === true) {
        newDiv11 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';

        if (data["passaportStatus"] === "A") {
            newDiv11 += '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv11 += '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv11 += '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(1);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
        } else if (data["passaportStatus"] === "R") {
            newDiv11 += '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv11 += '</div>' +
                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv11 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
        } else {
            newDiv11 +=
                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv11 += '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv11 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
        }
        newDiv11 += '</div>' +
            '</div>' +
            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
            '</div>';
    } else {
        newDiv11 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
            '<img class="img-done" src="/static/img/before-done-img.svg">' +
            '<img class="img-fail" src="/static/img/img-fail.svg">' +
            '</div>' +
            '</div>' +
            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
            '</div>';
    }






    // if (data["studentStatusExists"] === true) {
    if (data[""] === true) {
        newDiv12 = '<div class="" style="padding-bottom: 20px;">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';
        if (data["studentStatus"] === "A") {
            newDiv12 += '<div id="studentStatus" class="main-divs-color mutual-titles-color blue-text">Student Status</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv12 +=
                '</div>' +
                '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv12 +=
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(2);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(2);">';
        } else if (data["studentStatus"] === "R") {

            newDiv12 += '<div id="studentStatus" class="main-divs-color mutual-titles-color ">Student Status</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv12 +=
                '</div>' +
                '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv12 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(2);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(2);">';
        }
        else {
            newDiv12 +=
                '<div id="studentStatus" class="main-divs-color mutual-titles-color blue-text">Student Status</div>';
            newDiv12 +=
                '</div>' +
                '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv12 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(2);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(2);">';
        }


        newDiv12 +=
            '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
            '</div>';

    } else {
        newDiv12 = '<div class="" style="padding-bottom: 20px;">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div id="passport" class="main-divs-color mutual-titles-color">DS-2019</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="2" title="Upload DS-2019" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
            '<img class="img-done" src="/static/img/before-done-img.svg">' +
            '<img class="img-fail" src="/static/img/img-fail.svg">' +
            '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
            '</div>';
    }





    // if (data["certificateOfEnrolmentExists"] === true) {
        // if (data["certificateOfEnrolmentExists"] === true) {
            if (data[""] === true) {
        newDiv13 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';

        if (data["certificateStatus"] === "A") {
            newDiv13 += '<div id="certificateOfenro" class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv13 +=
                '</div>' +
                '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv13 +=
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(3);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(3);">';
        } else if (data["certificateStatus"] === "R") {
            newDiv13 += '<div id="certificateOfenro" class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv13 +=
                '</div>' +
                '<img data-number="3" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv13 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(3);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(3);">';
        } else {
            newDiv13 += '<div id="certificateOfenro" class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>' + '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv13 +=
                '</div>' +
                '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';

            newDiv13 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(3);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(3);">';
        }
        newDiv13 +=

            '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
            '</div>';
    }
    else {
        newDiv13 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div class="main-divs-color mutual-titles-color">DS-160 Confirmation</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="3" title="Upload DS-160" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
            '<img class="img-done" src="/static/img/before-done-img.svg">' +
            '<img class="img-fail" src="/static/img/img-fail.svg">'
            +
            '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
            '</div>';
    }





                    // if(data["photoExists"] === true){
                        if(data[""] === true){
                            newDiv14 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">';
                        if(data["photoStatus"] === "A"){
                            var newDiv14 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
                            '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>'+
                            '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                            '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(5);"> ' +
                            '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(5);">'+
                            '</div>'

                        '</div>';
                        }else if(data["photoStatus"] === "R"){
                            var newDiv14 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div class="main-divs-color mutual-titles-color ">Photo</div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +   
                            '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(5);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(5);">'
                                +
                            '</div>'

                        '</div>';
                        }else{
                            var newDiv14 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                                '<div class="docs-nike-fails" style="display: flex;">' +
                                '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                                '</div>' +   
                            '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(5);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(5);">'
                                +
                            '</div>'

                        '</div>';
                            }
                        }
                        else {
                            newDiv14 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div class="main-divs-color mutual-titles-color">Photo</div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                        '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                        '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                            '<img class="img-done" src="/static/img/before-done-img.svg">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg">' +
                            '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';

                    }

                    if (data[""] === true) {
                        newDiv15 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">';
                
                        if (data["passaportStatus"] === "A") {
                            newDiv15 += '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv15 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv11 += '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        } else if (data["passaportStatus"] === "R") {
                            newDiv15 += '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                            newDiv15 += '</div>' +
                                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv15 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
                        } else {
                            newDiv15 +=
                                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv15 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv15 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        }
                        newDiv15 += '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    } else {
                        newDiv15 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div id="passport" class="main-divs-color mutual-titles-color">Sevis Fee Payment Receipt</div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                            '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                            '<img class="img-done" src="/static/img/before-done-img.svg">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg">' +
                            '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    }

                    
                    if (data[""] === true) {
                        newDiv16 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">';
                
                        if (data["passaportStatus"] === "A") {
                            newDiv16 += '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv16 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv16 += '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        } else if (data["passaportStatus"] === "R") {
                            newDiv16 += '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                            newDiv16 += '</div>' +
                                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv16 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
                        } else {
                            newDiv16 +=
                                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv16 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv16 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        }
                        newDiv16 += '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    } else {
                        newDiv16 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div id="visa-appointment-confirmation" class="main-divs-color mutual-titles-color">Visa Appointment Confirmation</div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                            '<img data-number="1" title="Upload Visa Appointment" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                            '<img class="img-done" src="/static/img/before-done-img.svg">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg">' +
                            '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    }

                    
                    // if (data["jobOfferExists"] === true) {
                            if (data[""] === true) {
                                newDiv17 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                                '<div class="docs-nike-fails" style="display: flex;">';
                            if (data["jobOfferStatus"] === "A") {
                            var newDiv17 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                                '<div class="docs-nike-fails" style="display: flex;">' +
                                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                                '</div>' +
                                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(8);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(8);">'
                                +
                                '</div>'
                
                            '</div>';
                        } else if (data["jobOfferStatus"] === "R") {
                            var newDiv17 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                                '<div class="docs-nike-fails" style="display: flex;">' +
                                '<div class="main-divs-color mutual-titles-color ">Job Offer</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                                '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                                '</div>' +
                                '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(8);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(8);">'
                                +
                                '</div>'
                
                            '</div>';
                        } else {
                            var newDiv17 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
                                '<div class="docs-nike-fails" style="display: flex;">' +
                                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                                '</div>' +
                                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(8);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(8);">'
                                +
                                '</div>'
                
                            '</div>';
                        }
                    } else {
                        newDiv17 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div class="main-divs-color mutual-titles-color">Job Offer </div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                            '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                            '<img class="img-done" src="/static/img/before-done-img.svg">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg">' +
                            '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    }
                
                    // if (data["studentStatusExists"] === true) {
                        if (data[""] === true) {
                        newDiv18 = '<div class="" style="padding-bottom: 20px;">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">';
                        if (data["studentStatus"] === "A") {
                            newDiv18 += '<div id="studentStatus" class="main-divs-color mutual-titles-color blue-text">Student Status</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv18 +=
                                '</div>' +
                                '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
                            newDiv18 +=
                                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(2);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(2);">';
                        } else if (data["studentStatus"] === "R") {
                
                            newDiv18 += '<div id="studentStatus" class="main-divs-color mutual-titles-color ">Student Status</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                            newDiv18 +=
                                '</div>' +
                                '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
                            newDiv18 +=
                                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(2);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(2);">';
                        }
                        else {
                            newDiv18 +=
                                '<div id="studentStatus" class="main-divs-color mutual-titles-color blue-text">Student Status</div>';
                            newDiv18 +=
                                '</div>' +
                                '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
                            newDiv18 +=
                                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(2);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(2);">';
                        }
                
                
                        newDiv18 +=
                            '</div>' +
                            '</div>' +
                            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
                            '</div>';
                
                    } else {
                        newDiv18 = '<div class="" style="padding-bottom: 20px;">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div id="passport" class="main-divs-color mutual-titles-color">Student Status</div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                            '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                            '<img class="img-done" src="/static/img/before-done-img.svg">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg">' +
                            '</div>' +
                            '</div>' +
                            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
                            '</div>';
                    }
                
                    if (data[""] === true) {
                        newDiv19 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">';
                
                        if (data["passaportStatus"] === "A") {
                            newDiv19 += '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv19 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv19 += '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        } else if (data["passaportStatus"] === "R") {
                            newDiv19 += '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                            newDiv19 += '</div>' +
                                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv19 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
                        } else {
                            newDiv19 +=
                                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv19 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv19 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        }
                        newDiv19 += '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    } else {
                        newDiv19 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div id="transcript-of-grades" class="main-divs-color mutual-titles-color">Transcript of Grades</div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                            '<img data-number="1" title="Upload Transcript of Grades" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                            '<img class="img-done" src="/static/img/before-done-img.svg">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg">' +
                            '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    }

                    
                    if (data[""] === true) {
                        newDiv20 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">';
                
                        if (data["passaportStatus"] === "A") {
                            newDiv20 += '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv20 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv20 += '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        } else if (data["passaportStatus"] === "R") {
                            newDiv20 += '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                            newDiv20 += '</div>' +
                                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv20 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
                        } else {
                            newDiv20 +=
                                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv20 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv20 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        }
                        newDiv20 += '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    } else {
                        newDiv20 = '<div class="" style="">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div id="family-financial-records" class="main-divs-color mutual-titles-color">Family Financial Records</div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                            '<img data-number="1" title="Upload Family Financial Records" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                            '<img class="img-done" src="/static/img/before-done-img.svg">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg">' +
                            '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    }
                
                
                







    //                 if(data["photoExists"] === true){
    //                     if(data["photoStatus"] === "A"){
    //                         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //                         '<div class="docs-nike-fails" style="display: flex;">' +
    //                         '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
    //                         '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //                         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //                         '</div>'+
    //                         '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
    //                         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //                         '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(5);"> ' +
    //                         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(5);">'+
    //                         '</div>'

    //                     '</div>';
    //                     }else if(data["photoStatus"] === "R"){
    //                         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //                         '<div class="docs-nike-fails" style="display: flex;">' +
    //                         '<div class="main-divs-color mutual-titles-color ">Photo</div>' +
    //                         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //                         '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //                         '</div>' +   
    //                         '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
    //                         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //                             '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(5);">' +
    //                             '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(5);">'
    //                             +
    //                         '</div>'

    //                     '</div>';
    //                     }else{
    //                         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //                             '<div class="docs-nike-fails" style="display: flex;">' +
    //                             '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
    //                             '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //                             '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //                             '</div>' +   
    //                         '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
    //                         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //                             '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(5);">' +
    //                             '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(5);">'
    //                             +
    //                         '</div>'

    //                     '</div>';
    //                         }
    //                     }
    //                     else {
    //                     var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //                         '<div class="docs-nike-fails" style="display: flex;">' +
    //                         '<div class="main-divs-color mutual-titles-color">Photo</div>' +
    //                         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //                         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //                         '</div>' +
    //                     '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
    //                     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //                         '<img class="img-done" src="/static/img/before-done-img.svg">' +
    //                         '<img class="img-fail" src="/static/img/img-fail.svg">'
    //                          +
    //                     '</div>'

    //                 '</div>';
    //                 }
    // url = "/download-cv/"+id
    // if(data["ResumeStatus"] === "A"){
    //     var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //     '<div class="docs-nike-"fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
    //         '<img style="display:;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +
    //         '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
    //     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(6);">' +
    //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(6);">'
    //             +
    //         '</div>'
    //     '</div>';
    // }else if(data["ResumeStatus"] === "R"){
    //     var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //     '<div class="docs-nike-"fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +
    //         '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
    //     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(6);">' +
    //         '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(6);">'
    //             +
    //         '</div>'
    //     '</div>';
    // }
    // else{
    //     var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    //     '<div class="docs-nike-"fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +
    //     '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
    //     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(6);">' +
    //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(6);">'
    //             +
    //         '</div>'
    //     '</div>';
    // }
    // // var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
    // //     '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
    // //     '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
    // // '</div>';




    // if(data["serviceContractExists"] === true){
    //     if(data["serviceContractStatus"] === "A"){
    //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  ">' +
    //         '<div class="docs-nike-fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color blue-text">Service Contract</div>' +
    //         '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +  
    //         '<img data-number="7" title="Download Service Contract" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
    //         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(7);">' +
    //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(7);">'
    //          +
    //     '</div>'

    //     '</div>';
    //     }else if(data["serviceContractStatus"] === "R"){

    //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
    //         '<div class="docs-nike-fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color ">Service Contract</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +  
    //         '<img data-number="7" title="Upload Service Contract"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
    //         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(7);">' +
    //         '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(7);">'
    //             +
    //         '</div>'

    //         '</div>';
    //     }else{
    //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
    //         '<div class="docs-nike-fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color blue-text">Service Contract</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +  
    //         '<img data-number="7" title="Download Service Contract" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
    //         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(7);">' +
    //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(7);">'
    //          +
    //     '</div>'

    //     '</div>';
    //     }
    // }

    //     else {
    //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
    //         '<div class="docs-nike-fails" style="display: flex;">' +
    //         '<div class="main-divs-color mutual-titles-color">Service Contract</div>' +
    //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
    //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
    //         '</div>' +   
    //         '<img data-number="7" title="Upload Service Contract"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
    //         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
    //         '<img class="img-done" src="/static/img/before-done-img.svg">' +
    //         '<img class="img-fail" src="/static/img/img-fail.svg">'
    //          +
    //     '</div>'
    //     '</div>'
    //         }

    $('#usEmbassydocumentList').empty();
    // Append the new div elements to the documentList
    $('#usEmbassydocumentList').append(newDiv11, newDiv12, newDiv13, newDiv14, newDiv15, newDiv16, newDiv17, newDiv18, newDiv19, newDiv20); 

    var beforeNewDiv8 = '<img class="imgs-three-dots-zip-img three-dots-document" style="" src="/static/img/Three-dots.svg">';
    var beforeNewDiv9 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadDocForWorkPermitFolder(' + data["email"] + ')">';

    $('.your-j1-visa-is-here-parent-img-zip').empty();
    $('.your-j1-visa-is-here-parent-img-zip').append(beforeNewDiv8, beforeNewDiv9);
    var newDiv21 = "";

    // var newDiv1111 = '<input type="hidden" id="applicantID">';
                    
                    if (data[""] === true) {
                        newDiv21 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">';
                
                        if (data["passaportStatus"] === "A") {
                            newDiv21 += '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv21 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv21 += '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        } else if (data["passaportStatus"] === "R") {
                            newDiv21 += '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                            newDiv21 += '</div>' +
                                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv21 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
                        } else {
                            newDiv21 +=
                                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv21 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv21 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
                        }
                        newDiv21 += '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    } else {
                        newDiv21 = '<div class="" style="">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div id="j1-visa" class="main-divs-color mutual-titles-color">J1 Visa</div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                            '<img data-number="1" title="Upload J1 Visa" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                            '<img class="img-done" src="/static/img/before-done-img.svg">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg">' +
                            '</div>' +
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
                            '</div>';
                    }

    $('#yourJ1VisaIsHeredocumentList').empty();
    // Append the new div elements to the documentList
    $('#yourJ1VisaIsHeredocumentList').append(newDiv21);
    var mainJobs = false;

    document.getElementById("Stat").innerHTML = data["StatusApp"];
    // document.getElementById("calendly-div") = data["calendlyDiv"];
    document.getElementById("applyDate").innerHTML = data["applyDate"];
    document.getElementById("applyDateTime").innerHTML = data["applyDateTime"];
    if (data["ApplicantStatDate"]) {
        document.getElementById("ApplicantStatDate").innerHTML = data["ApplicantStatDate"];

        document.getElementById("ApplicantStatDateTime").innerHTML = data["ApplicantStatDateTime"];
    } else {
        document.getElementById("ApplicantStatDate").innerHTML = data["applyDate"];

        document.getElementById("ApplicantStatDateTime").innerHTML = data["applyDateTime"];

    }
    var auth = data["auth"];

    var element = document.getElementById("job_title");
    element.innerHTML = data["title"];
    var countApplicant = document.getElementById("countApplicant")

    if (data["appNo"] == 0) {
        countApplicant.innerHTML = data["appNo"] + " applicants"
    } else if (data["appNo"] >= 2) {
        countApplicant.innerHTML = data["appNo"] + " applicants"
    }
    else {
        countApplicant.innerHTML = data["appNo"] + " applicant"
    }

    function getMonthDifference(startDate, endDate) {
        return (
            endDate.getMonth() -
            startDate.getMonth() +
            12 * (endDate.getFullYear() - startDate.getFullYear())
        );
    }

    var c = (getMonthDifference(
        new Date(data["SDate"]), new Date(data["EDate"]))
    );
    var total = (data["salary"] * data['hourPerWork']) * 4 * c;
    var tt = Math.floor(total);
    var SalaryPerHour = document.getElementById("salary");
    SalaryPerHour.innerHTML = "€" + tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " total income"


    if (data["country"] == "USA") {
        var salary = document.getElementById("salary")
        salary.innerHTML = "$" + data["salary"] + "/hour"
        if (data["tips"]) {
            document.getElementById("totsalary").innerHTML = "$" + tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " total income / +tips";

        }
        else {
            document.getElementById("totsalary").innerHTML = "$" + tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " total income ";
        }
    } else {
        var salary = document.getElementById("salary")
        salary.innerHTML = "€" + data["salary"] + "/hour"
        if (data["tips"]) {
            document.getElementById("totsalary").innerHTML = "€" + tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " total income / +tips";
        } else {
            document.getElementById("totsalary").innerHTML = "€" + tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " total income";

        }
    }





    let Description = document.getElementById('message');
    Description.innerHTML = data["description"];

    var Address = document.getElementById("city");
    Address.innerHTML = data["city_j"] + ",  " + data["country"];

    var ShiftDate = document.getElementById("sDate");
    ShiftDate.innerHTML = data["start_date"] + " - " + data["end_date"];

    var typeOfWork = document.getElementById('typeOfWork')
    typeOfWork.innerHTML = data["typeOfWork"] + " "
    var hourPerWork = document.getElementById('hourPerWork')
    hourPerWork.innerHTML = " " + data['hourPerWork'] + " hours/week"

    var Company = document.getElementById("company");
    Company.innerHTML = data["company"];



    var housing = document.getElementById("housing")
    housing.innerHTML = "Housing " + data['housing']

    if (data["country"] == "USA") {
        var housingCost = document.getElementById("housingCost")
        housingCost.innerHTML = "$" + data["housingCost"] + "/week"
    } else {
        var housingCost = document.getElementById("housingCost")
        housingCost.innerHTML = "€" + data["housingCost"] + "/week"
    }


    var program = document.getElementById('program');
    program.innerHTML = data["program"];



    var programCost = document.getElementById("programCost")
    programCost.innerHTML = "Program Cost: €" + data["programCost"]


    // if(data["company"]==="Lopez Small LLC"){
    //     $(".application-update-form-content").css("display","none");
    //     $(".documents-for-work-permit-form-content").css("display","none");
    //     $(".meet-us-form-content").css("display","none");
    //     // $(".payment-form-content").css("display","block");
    //     $(".payment-div").css("display","none");
    //     $(".meet-with-us-div").css("display","flex");
    // }
    // else {
    //     $(".payment-form-content").css("display","none");
    //     $(".payment-div").css("display","none");
    //     $(".meet-with-us-div").css("display","none");
    //     $(".meet-us-form-content").css("display","block");

    // }

    var auth = data["auth"]
    var button = document.getElementById("button")
    var rB = document.getElementById("recruiterR")
    var hasApply = data["hasApply"];

    const mediaQuery = window.matchMedia('(max-width: 767px)');

    if (!mediaQuery.matches) {
        var select = document.getElementById('select' + post_id);
        select.style.backgroundColor = "#E7F1FE";

    };

    // const applicationDetails = data["applicationDetails"]
    // if (applicationDetails.firstPaymentDone && applicationDetails.secondPaymentDone && applicationDetails.thirdPaymentDone) {
    //     document.getElementById('checkout').innerText = "All payments done!"
    // }
    // else {
    //     document.getElementById('checkout').innerText = ""
    //     initializeStripe();
    // }
}









