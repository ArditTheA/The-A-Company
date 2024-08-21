async function getUser(id, show = 0) {
    document.getElementById("sectedUser").value = id;
    document.getElementById("user_id").value = id;

    var elements = document.getElementsByClassName('pixel'); // get all elements
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "white";
    }
    $(".payment-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "block");
    var jpk = $("#job-id-hidden").val();

    let response = await fetch('/match/getUserData', {
        method: "get",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            userid: id,
            jpk: jpk,
        }
    });

    let data = await response.json();
    if (data["usersJobsPaymentsDetails"] && data["usersJobsPaymentsDetails"].id) {
        document.getElementById("save-edit-payment-amount-and-link").style.display = "none";
        document.getElementById("edit-payment-amount-and-link").style.display = "block";
        document.getElementById('payment-amount-and-link-div').innerHTML = `
            <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
                <div class="description-divs-color">First Payment</div>
                <div type="text" id="first_payment_amount">${data["usersJobsPaymentsDetails"].paymentAmount}</div>
            </div>
            <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
                <div class="description-divs-color">Payment link</div>
                <input id="first_payment_link" value="${data["usersJobsPaymentsDetails"].paymentLink}">
            </div>
                                    <div>
                             <div id="edit-payment-amount-and-link">Amount</div>
                        </div>
                        <div>
                             <div style="display: none"; id="save-edit-payment-amount-and-link"></div>
                        </div>
        `;
    } else {
        document.getElementById('payment-amount-and-link-div').innerHTML = `
            <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
                <div class="description-divs-color">First Payment</div>
                <div id="first_payment_amount" class="second-color-of-divs">€400.00</div>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <div class="description-divs-color">Payment link</div>
                <div id="first_payment_link" class="second-color-of-divs">Stripe</div>
            </div>
            <div>
                <div id="edit-payment-amount-and-link">Edit</div>
            </div>
            <div>
                <div style="display: none;" id="save-edit-payment-amount-and-link">Edit Amount</div>
            </div>
        `;
    }

    function attachEventListeners() {
        if (document.getElementById("edit-payment-amount-and-link")) {
            document.getElementById("edit-payment-amount-and-link").addEventListener("click", function () {
                var firstPaymentAmount = document.getElementById('first_payment_amount').innerHTML;
                document.getElementById('payment-amount-and-link-div').innerHTML = `
                    <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
                        <div class="description-divs-color">First Payment</div>
                        <input type="text" id="first_payment_amount" value="${firstPaymentAmount.trim()}">
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
                        <div class="description-divs-color">Payment link</div>
                        <input id="first_payment_link" value="${data["usersJobsPaymentsDetails"].paymentLink}">
                    </div>
                    <img style="display: block;" id="save-edit-payment-amount-and-link" title="Edit Payment Amount and Link" class="imgs-three-dots-zip-img three-dots-document" src="/static/img/Three-dots.svg">
                `;
                attachEventListeners(); // Reattach event listeners after updating inner HTML
            });
        }
        if (document.getElementById("save-edit-payment-amount-and-link")) {
        document.getElementById("save-edit-payment-amount-and-link").addEventListener("click", function () {
            const PaymentAmount = document.getElementById('first_payment_amount').value;
            const PaymentLink = document.getElementById('first_payment_link').value;
        
            $.ajax({
                type: "POST",
                url: '/payment/update/',
                data: {
                    job_id: jpk,
                    user_id: id,
                    paymentAmount: PaymentAmount,
                    paymentLink: PaymentLink,
                },
                success: function () {
                    document.getElementById('payment-amount-and-link-div').innerHTML = `
                        <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
                            <div class="description-divs-color">First Payment</div>
                            <div type="text" id="first_payment_amount">${PaymentAmount}</div>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
                            <div class="description-divs-color">Payment link</div>
                            <input id="first_payment_link" value="${PaymentLink}">
                        </div>
                        <div>
                            <div id="edit-payment-amount-and-link">Edit</div>
                        </div>
                        <div>
                            <div id="save-edit-payment-amount-and-link">Edit Amount</div>
                        </div>
                    `;
                    attachEventListeners(); // Reattach event listeners after updating inner HTML
                },
                error: function (e) {
                    console.log(e);
                }
            });
        });
        }
    }

    attachEventListeners();

    if (data["isQualified"]) {
        document.querySelectorAll(".block-this").forEach(blockThis => {
            blockThis.style.display = "block";
        })
    }

    if (data["usersWithAppointments"].id) {
        document.getElementById("meet-with-us").innerHTML = `
        <div style="width: 100%;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
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
            <div style="display: flex; justify-content: space-between;">
            <div class="date-time-color">Confirm meeting</div>
            <div style="display: flex;">
            <img title="Complete the meeting phase" style="margin-right: 5px;" id="meeting-finished" class="img-done" src="/static/img/before-done-img.svg">
            <img title="Meeting pending" style="margin-right: 5px;" id="meeting-pending" style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">
            <img class="img-fail" src="/static/img/img-fail.svg">
            </div>
        </div>

    `;
    }

        //     <div>Please check your email for further instructions.</div>
        // <button id="meeting-finished">Meeting finished</button>
        // <button id="meeting-pending" style="display: none;">Meeting pending</button>

    else {
        document.getElementById("meet-with-us").innerHTML = "";
        $(".completed-meet-with-us-phase").css("display", "none");
    }



    if (data["usersWithAppointments"].meetingDone) {
        $(".completed-meet-with-us-phase").css("display", "block");
        $("#meeting-finished").css("display", "none");
        $("#meeting-pending").css("display", "block");
        document.querySelectorAll(".divs-pointer-event-auto").forEach(a => {
            a.style.pointerEvents = "visible";
        })
    }

    else {
        $(".completed-meet-with-us-phase").css("display", "none");
        $("#meeting-finished").css("display", "block");
        $("#meeting-pending").css("display", "none");
    }


    if (document.getElementById('meeting-finished')) {
        document.getElementById('meeting-finished').addEventListener("click", () => {
            $.ajax({
                type: "POST",
                url: '/user_job_appointments/finished/',
                data: {
                    job_id: jpk,
                    user_id: id,
                },
                success: function () {
                    document.querySelectorAll(".divs-pointer-event-auto").forEach(a => {
                        a.style.pointerEvents = "visible";
                    })
                    $("#meeting-pending").css("display", "block");
                    $("#meeting-finished").css("display", "none");
                    $(".completed-meet-with-us-phase").css("display", "block");
                }
            })
        })
    }

    if (document.getElementById('meeting-pending')) {
        document.getElementById('meeting-pending').addEventListener("click", () => {
            $.ajax({
                type: "POST",
                url: '/user_job_appointments/pending/',
                data: {
                    job_id: jpk,
                    user_id: id,
                },
                success: function () {
                    $("#meeting-pending").css("display", "none");
                    $("#meeting-finished").css("display", "block");
                    $(".completed-meet-with-us-phase").css("display", "none");
                    document.querySelectorAll(".divs-pointer-event-auto").forEach(a => {
                        a.style.pointerEvents = "none";

                    })
                }
            })
        })
    }

    if (data["usersJobInterviewDetails"].id) {
        console.log("Armir")
        document.getElementById('job-interview-edit-button').style.display = "block";
        document.getElementById("job-interview-div").innerHTML = `
        <div style="width: 100%;">
            <div style="display: flex; justify-content: space-between;">
                <div style="display: flex;">
                <img src="/static/img/interview-date-icon.svg" alt="Interview Date Icon">
                <div class="main-divs-color date-time-color interview-distance-between-div-img" id="date-meeting">${data["usersJobInterviewDetails"].interviewDate}</div>
                </div>
                <div style="display: flex;">
                <img src="/static/img/interview-time-icon.svg" alt="Interview Time Icon">
                <div class="main-divs-color date-time-color interview-distance-between-div-img" id="time-meeting">${data["usersJobInterviewDetails"].interviewTime}</div>
                </div>
                <div style="display: flex;">
                <img src="/static/img/interview-link-icon.svg" alt="Interview Link Icon">
                <a class="interview-distance-between-div-img" href="${data["usersJobInterviewDetails"].interviewLink}" target="_blank">Interview link</a>
                </div>
            </div>
        </div>
    `;
    }

    




    // <button id="job-interview-finished">Meeting finished</button>
    // <button id="job-interview-pending" style="display: none;">Meeting pending</button>

    
    else {
        console.log("Ardit")
        document.getElementById("job-interview-div").innerHTML = "";
        document.getElementById("job-interview-div").innerHTML = `
                    <div style="display: flex;">
                    <div style="display: flex; align-items: center;" class="margin-right-job-interview-divs">
                    <div>
                    <img src="/static/img/interview-date-icon.svg" alt="Interview Date Icon">
                    </div>
                    <div>
                    <input placeholder="Date" style="width: 100%;" class="interview-distance-between-div-img job-interview-input-elements" id="job-interview-date">
                    </div>
                    </div>
                    <div style="display: flex; align-items: center;" class="margin-right-job-interview-divs">
                    <div>
                    <img src="/static/img/interview-time-icon.svg" alt="Interview Time Icon">
                    </div>
                    <div>
                    <input placeholder="Time" style="width: 100%;" class="interview-distance-between-div-img job-interview-input-elements" id="job-interview-time">
                    </div>
                </div>
                    <div style="display: flex; align-items: center;" class="">
                    <img src="/static/img/interview-link-icon.svg" alt="Interview Link Icon">
                    <input placeholder="URL" style="width: 100%;" class="job-interview-link interview-distance-between-div-img job-interview-input-elements" id="job-interview-link">
                    </div>
    `;

    // <input type="date" id="job-interview-date">
    // <input type="time" id="job-interview-time">
    // <div class="job-interview-link" id="job-interview-link">Interview link</div>
    // <div>
    //     <div id="job-interview-button">Save</div>
    // </div>


        document.getElementById('job-interview-edit-button').style.display = "none";        
        document.getElementById('job-interview-save-edit-button').style.display = "block";
        $(".completed-job-interview-phase").css("display", "none");
    }
    if (data["usersJobInterviewDetails"].interviewDone) {
        $(".completed-job-interview-phase").css("display", "block");
        $("#job-interview-finished").css("display", "none");
        $("#job-interview-pending").css("display", "block");
        document.querySelectorAll(".divs-pointer-event-auto").forEach(a => {
            a.style.pointerEvents = "visible";
        })
    }
    else {
        $(".completed-job-interview-phase").css("display", "none");
    }


    if (document.getElementById("job-interview-button")) {
        document.getElementById("job-interview-button").addEventListener("click", (e) => {
            document.getElementById("job-interview-div").innerHTML = "";
            const jobInterviewDate = document.getElementById('job-interview-date').value
            const jobInterviewTime = document.getElementById('job-interview-time').value
            let jobInterviewLink = document.getElementById('job-interview-link').innerText;
            jobInterviewLink = data["usersWithAppointments"].meetingLink;
            // console.log({ jobInterviewDate, jobInterviewTime, jobInterviewLink, jpk, id })

            $.ajax({
                type: "POST",
                url: '/user_job_interview/',
                data: {
                    job_id: jpk,
                    user_id: id,
                    interviewDate: jobInterviewDate,
                    interviewTime: jobInterviewTime,
                    interviewLink: jobInterviewLink
                },
                success: function () {
                    // ni div qe i shfaq details e interview, display: block
                    console.log("Interview added")
                    document.getElementById("job-interview-edit-button").style.display = "block";
                    document.getElementById("job-interview-div").innerHTML = `
                <div style="width: 100%;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <div style="display: flex;">
                        <img src="/static/img/interview-date-icon.svg" alt="Interview Date Icon">
                        <div class="main-divs-color date-time-color interview-distance-between-div-img" id="date-meeting">${jobInterviewDate}</div>
                        </div>
                        <div style="display: flex;">
                        <img src="/static/img/interview-time-icon.svg" alt="Interview Time Icon">
                        <div class="main-divs-color date-time-color interview-distance-between-div-img" id="time-meeting">${jobInterviewTime}</div>
                        </div>
                        <div style="display: flex;">
                        <img src="/static/img/interview-link-icon.svg" alt="Interview Link Icon">
                        <a class="interview-distance-between-div-img" href="${jobInterviewLink}" target="_blank">Interview link</a>
                        </div>
                    </div>
                </div>
                        <button id="job-interview-finished">Job Interview finished</button>
                        <button id="job-interview-pending" style="display: none;">Job Interview pending</button>
                
            `;
            
                }
            })

            // e.stopPropagation();

        })
    }

    if (document.getElementById("job-interview-save-edit-button")) {
        document.getElementById("job-interview-save-edit-button").addEventListener("click", () => {
            const jobInterviewDate = document.getElementById('job-interview-date').value
            const jobInterviewTime = document.getElementById('job-interview-time').value
            let jobInterviewLink = document.getElementById('job-interview-link').innerText
            jobInterviewLink = data["usersWithAppointments"].meetingLink

            console.log({ jobInterviewDate, jobInterviewLink, jobInterviewTime, id, jpk })

            // save edit interview

            $.ajax({
                type: "POST",
                url: '/user_job_interview/update/',
                data: {
                    job_id: jpk,
                    user_id: id,
                    interviewDate: jobInterviewDate,
                    interviewTime: jobInterviewTime,
                    interviewLink: jobInterviewLink
                },
                
                
                success: function () {
                    data["usersJobInterviewDetails"].interviewDate = jobInterviewDate
                    data["usersJobInterviewDetails"].interviewTime = jobInterviewTime
                    data["usersJobInterviewDetails"].interviewLink = jobInterviewLink
                    console.log("Interview updated")
                    console.log({ jpk, id })
                    document.getElementById('job-interview-save-edit-button').style.display = "none"
                    // document.getElementById('job-interview-edit-button').style.display = "block"
                    document.getElementById("job-interview-div").innerHTML = `
                <div style="width: 100%;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <div style="display: flex;">
                        <img src="/static/img/interview-date-icon.svg" alt="Interview Date Icon">
                        <div class="main-divs-color date-time-color interview-distance-between-div-img" id="date-meeting">${jobInterviewDate}</div>
                        </div>
                        <div style="display: flex;">
                        <img src="/static/img/interview-time-icon.svg" alt="Interview Time Icon">
                        <div class="main-divs-color date-time-color interview-distance-between-div-img" id="time-meeting">${jobInterviewTime}</div>
                        </div>
                        <div style="display: flex;">
                        <img src="/static/img/interview-link-icon.svg" alt="Interview Link Icon">
                        <a class="interview-distance-between-div-img" href="${jobInterviewLink}" target="_blank">Interview link</a>
                        </div>
                    </div>
                </div>
                                        <button id="job-interview-finished">Job Interview finished</button>
                        <button id="job-interview-pending" style="display: none;">Job Interview pending</button>
            `;

                },
                
                error: function (e) {
                    console.log(e)
                }
            })
        })
    }

    if (document.getElementById("job-interview-edit-button")) {
        document.getElementById("job-interview-edit-button").addEventListener("click", function (e) {
            console.log("interviewEditButton");
            document.getElementById('job-interview-div').innerHTML = `
            <input type="date" id="job-interview-date" value=${data["usersJobInterviewDetails"].interviewDate}>
            <input type="time" id="job-interview-time" value=${data["usersJobInterviewDetails"].interviewTime}>
            <div class="job-interview-link" id="job-interview-link" href="${data["usersJobInterviewDetails"].interviewLink}">Interview Link</div>
        `;
            document.getElementById('job-interview-save-edit-button').style.display = "block";
            document.getElementById('job-interview-edit-button').style.display = "none";
        })
    }


    if (document.getElementById('job-interview-finished')) {
        document.getElementById('job-interview-finished').addEventListener("click", () => {
            $.ajax({
                type: "POST",
                url: '/user_job_interview/finished/',
                data: {
                    job_id: jpk,
                    user_id: id,
                },
                success: function () {
                    document.querySelectorAll(".divs-pointer-event-auto").forEach(a => {
                        a.style.pointerEvents = "visible";
                    })
                    $("#job-interview-pending").css("display", "block");
                    $("#job-interview-finished").css("display", "none");
                    $(".completed-job-interview-phase").css("display", "block");

                }
            })
        })
    }

    if (document.getElementById('job-interview-pending')) {
        document.getElementById('job-interview-pending').addEventListener("click", () => {
            $.ajax({
                type: "POST",
                url: '/user_job_interview/pending/',
                data: {
                    job_id: jpk,
                    user_id: id,
                },
                success: function () {
                    $("#job-interview-pending").css("display", "none");
                    $("#job-interview-finished").css("display", "block");
                    $(".completed-job-interview-phase").css("display", "none");
                    document.querySelectorAll(".divs-pointer-event-auto").forEach(a => {
                        a.style.pointerEvents = "none";

                    })
                }
            })
        })
    }

    if (data["isNotQualified"]) {
        document.querySelectorAll(".phase").forEach(a => {
            a.style.pointerEvents = "none";
        })
        document.querySelectorAll(".phaseTwo").forEach(a => {
            a.style.pointerEvents = "none";
        })
        document.querySelectorAll(".block-this").forEach(blockThis => {
            blockThis.style.display = "none";
        })


    }

    if (show === 1) {
        if (data["phaseOneCompleted"]) {
            $(".application-update-form-content").css("display", "none");
            $(".documents-for-work-permit-form-content").css("display", "block");
        }
        else {
            $(".application-update-form-content").css("display", "none");
            $(".documents-for-work-permit-form-content").css("display", "block");
        }
        $(".your-work-permit-is-here-form-content").css("display", "none");
    }
    else if (show === 2) {
        if (data["phaseTwoCompleted"]) {

            $(".application-update-form-content").css("display", "none");
            $(".your-work-permit-is-here-form-content").css("display", "block");
        }
        else {
            $(".application-update-form-content").css("display", "none");
            $(".your-work-permit-is-here-form-content").css("display", "block");
        }
        $(".documents-for-work-permit-form-content").css("display", "none");
    }
    else {
        $(".meet-us-form-content").css("display", "block");
        $(".job-interview-form-content").css("display", "none");
    }
    var list = document.getElementsByClassName("JSAdded");

    for (var i = list.length - 1; 0 <= i; i--) {
        if (list[i] && list[i].parentElement)
            list[i].parentElement.removeChild(list[i]);
    }
    document.getElementById("Stat").innerHTML = data["Status"];
    document.getElementById("fname").innerHTML = data["fname"] + " " + data["lname"];
    document.getElementById("email").innerHTML = data["email"];
    document.getElementById("phone").innerHTML = data["phone"];
    document.getElementById("location").innerHTML = data["city"];
    document.getElementById("applyDate").innerHTML = data["applyDate"];
    document.getElementById("applyDateTime").innerHTML = data["applyDateTime"];

    function isCalendlyEvent(e) {
        return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
    }


    // Event listener for messages from Calendly
    window.addEventListener("message", function (e) {
        if (isCalendlyEvent(e)) {
            // Log the event name and payload (optional for debugging)
            console.log("Event name:", e.data.event);
            console.log("Event details:", e.data.payload); // Log the payload to the console

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
                        'Authorization': 'Bearer ' + token
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
                                job_id: jpk,
                                user_id: id,
                                meetingDate: formattedDate,
                                meetingTime: formattedTime,
                                meetingLink: meetingLink,
                            },
                        })

                        // Qetu e thirr ni python endpoint e cila e run ne databaze ni record me jobId, userId (psh: ne nje tabele te re qe quhet user_job_appointments (userId, jobId))
                        console.log("API Response:", response); // Log the response for debugging\
                        console.log("Start Time:", response.resource.start_time); // Log the response for debugging\
                        console.log("End Time:", response.resource.end_time); // Log the response for debugging\

                        document.getElementById("meet-with-us").innerHTML = `
    <p>Your meeting has been successfully scheduled.</p>
    <p>Date: ${formattedDate}</p>
    <p>Time: ${formattedTime}</p>
    <p>Please check your email for further instructions.</p>
    <p>Meeting-link: <a href="${apiResponse.location.join_url}" target="_blank">Join the meeting</a></p>
`;
                    }
                });

                // Change the content of the div
            }
        }
    });

    // if (data["city"] === "Azerbaijan") {
    //     $(".application-update-form-content").css("display","none");
    //     $(".documents-for-work-permit-form-content").css("display","none");
    //     $(".meet-with-us-form-content").css("display","none");
    //     $(".payment-form-content").css("display","block");
    //     $(".payment-div").css("display","flex");
    //     $(".meet-with-us-div").css("display","flex");
    // }
    // else {
    //     $(".payment-form-content").css("display","none");
    //     $(".payment-div").css("display","none");
    //     $(".meet-with-us-div").css("display","none");

    // }
    if (data["isQualified"]) {
        if (data["phaseOneCompleted"]) {
            data["UserWorkPermit"] += 1;
            document.querySelectorAll(".completed-phase").forEach(element => {
                element.style.display = "block";
            });
            document.querySelectorAll(".progress-phase").forEach(element => {
                element.style.display = "none";
            });
            document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
                element.style.display = "block";
            });
            document.querySelectorAll(".phaseTwo").forEach(a => {
                a.style.pointerEvents = "auto";
            })
            document.querySelectorAll(".phase").forEach(a => {
                a.style.pointerEvents = "auto";

            })

        }
        else {
            document.querySelectorAll(".completed-phase").forEach(element => {
                element.style.display = "none";
            });
            document.querySelectorAll(".progress-phase").forEach(element => {
                element.style.display = "block";
            });
            document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
                element.style.display = "none";
            });
            document.querySelectorAll(".phaseTwo").forEach(a => {
                a.style.pointerEvents = "none";
            })
            document.querySelectorAll(".phase").forEach(a => {
                a.style.pointerEvents = "auto";
            })

        }
    }
    else {
        document.querySelectorAll(".completed-phase").forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll(".progress-phase").forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
            element.style.display = "none";
        });
    }
    if (data["isQualified"]) {
        if (data["phaseTwoCompleted"]) {
            if (data["phaseOneCompleted"]) {
                document.querySelectorAll(".second-completed-phase").forEach(blockThis => {
                    blockThis.style.display = "block";
                })
                document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
                    element.style.display = "none";
                });
            }
            else {
                document.querySelectorAll(".second-completed-phase").forEach(blockThis => {
                    blockThis.style.display = "none";
                })
            }
            document.querySelectorAll(".phase").forEach(a => {
                a.style.pointerEvents = "auto";
            })
        }
        else {
            document.querySelectorAll(".second-completed-phase").forEach(blockThis => {
                blockThis.style.display = "none";
            })

        }
    }
    else {
        document.querySelectorAll(".second-completed-phase").forEach(blockThis => {
            blockThis.style.display = "none";
        })
        document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
            element.style.display = "none";
        });

    }
    if (data[ApplicantStatDate]) {
        document.getElementById("ApplicantStatDate").innerHTML = data["ApplicantStatDate"];

        document.getElementById("ApplicantStatDateTime").innerHTML = data["ApplicantStatDateTime"];
    } else {
        document.getElementById("ApplicantStatDate").innerHTML = data["applyDate"];

        document.getElementById("ApplicantStatDateTime").innerHTML = data["applyDateTime"];

    }

    var beforeNewDiv1 = '<img class="imgs-three-dots-zip-img three-dots-document" style="" src="/static/img/Three-dots.svg">';
    var beforeNewDiv2 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadDocForWorkPermitFolder(' + data["email"] + ')">';

    $('.parent-img-zip').empty();
    $('.parent-img-zip').append(beforeNewDiv1, beforeNewDiv2);
    var newDiv1 = "";
    var newDiv2 = "";
    var newDiv3 = "";
    var newDiv4 = "";
    var newDiv5 = "";
    var newDiv6 = "";
    var newDiv7 = "";
    // Documents
    var newDiv = '<input type="hidden" id="applicantID">';
    if (data["passaportExists"] === true) {

        newDiv1 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';

        if (data["passaportStatus"] === "A") {
            newDiv1 += '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv1 += '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv1 += '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(1);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
        } else if (data["passaportStatus"] === "R") {
            newDiv1 += '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv1 += '</div>' +
                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv1 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
        } else {
            newDiv1 +=
                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv1 += '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv1 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
        }
        newDiv1 += '</div>' +
            '</div>' +
            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
            '</div>';
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
            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
            '</div>';
    }






    if (data["studentStatusExists"] === true) {
        newDiv2 = '<div class="" style="padding-bottom: 20px;">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';
        if (data["studentStatus"] === "A") {
            newDiv2 += '<div id="studentStatus" class="main-divs-color mutual-titles-color blue-text">Student Status</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv2 +=
                '</div>' +
                '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv2 +=
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(2);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(2);">';
        } else if (data["studentStatus"] === "R") {

            newDiv2 += '<div id="studentStatus" class="main-divs-color mutual-titles-color ">Student Status</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv2 +=
                '</div>' +
                '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv2 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(2);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(2);">';
        }
        else {
            newDiv2 +=
                '<div id="studentStatus" class="main-divs-color mutual-titles-color blue-text">Student Status</div>';
            newDiv2 +=
                '</div>' +
                '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv2 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(2);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(2);">';
        }


        newDiv2 +=
            '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
            '</div>';

    } else {
        newDiv2 = '<div class="" style="padding-bottom: 20px;">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
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





    if (data["certificateOfEnrolmentExists"] === true) {
        newDiv3 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';

        if (data["certificateStatus"] === "A") {
            newDiv3 += '<div id="certificateOfenro" class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv3 +=
                '</div>' +
                '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv3 +=
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(3);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(3);">';
        } else if (data["certificateStatus"] === "R") {
            newDiv3 += '<div id="certificateOfenro" class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv3 +=
                '</div>' +
                '<img data-number="3" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv3 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(3);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(3);">';
        } else {
            newDiv3 += '<div id="certificateOfenro" class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>' + '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv3 +=
                '</div>' +
                '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';

            newDiv3 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(3);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(3);">';
        }
        newDiv3 +=

            '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
            '</div>';
    }
    else {
        newDiv3 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="3" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
            '<img class="img-done" src="/static/img/before-done-img.svg">' +
            '<img class="img-fail" src="/static/img/img-fail.svg">'
            +
            '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
            '</div>';
    }





    if (data["studentIdExists"] === true) {

        newDiv4 = '<div class="" style="">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';
        if (data["studentIdStatus"] === "A") {

            newDiv4 += '<div class="main-divs-color mutual-titles-color blue-text">Student ID</div>' +
                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv4 += '</div>' +
                '<img data-number="4" title="Download Student ID" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv4 +=
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(4);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(4);">';

        } else if (data["studentIdStatus"] === "R") {
            newDiv4 += '<div class="main-divs-color mutual-titles-color">Student ID</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv4 += '</div>' +
                '<img data-number="4" title="Upload Student ID" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv4 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(4);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(4);">';
        } else {
            newDiv4 += '<div class="main-divs-color mutual-titles-color blue-text">Student ID</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv4 += '</div>' +
                '<img data-number="4" title="Download Student ID" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv4 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(4);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(4);">';
        }



        newDiv4 += '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official identification card issued by a university</div>' +
            '</div>';

    }
    else {

        newDiv4 = '<div class="" style="">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
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
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official identification card issued by a university</div>' +
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

    $('#documentList').empty();
    // Append the new div elements to the documentList
    $('#documentList').append(newDiv, newDiv1, newDiv2, newDiv3, newDiv4);


    var newDiv8 = ""
    var newDiv9 = ""

    if (data["jobOfferExists"] === true) {
        if (data["jobOfferStatus"] === "A") {
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
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
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
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
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
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
        var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  padding-bottom:20px; ">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div class="main-divs-color mutual-titles-color">Job Offer </div>' +
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
    if (data["workPermitExists"] === true) {
        if (data["workPermitStatus"] === "A") {
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="9" title="Download Work Permit" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(9);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(9);">'
                +
                '</div>'

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
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(9);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(9);">'
                +
                '</div>'

            '</div>';
        } else {
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="9" title="Download Work Permit" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(9);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(9);">'
                +
                '</div>'

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
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
            '<img class="img-done" src="/static/img/before-done-img.svg">' +
            '<img class="img-fail" src="/static/img/img-fail.svg">'
            +
            '</div>'
        '</div>'
    }
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
    var newDiv1_1 = "";
    var newDiv11 = "";
    var newDiv12 = "";
    // var newDiv13 = "";
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
    if (data["passaportExists"] === true) {
        newDiv1_1 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';

        if (data["passaportStatus"] === "A") {
            newDiv1_1 += '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv1_1 += '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                newDiv1_1 += '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(1);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
        } else if (data["passaportStatus"] === "R") {
            newDiv1_1 += '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv1_1 += '</div>' +
                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv1_1 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
        } else {
            newDiv1_1 +=
                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv1_1 += '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv1_1 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
        }
        newDiv1_1 += '</div>' +
            '</div>' +
            '<div style="width: calc(100% - 40px);" class="main-divs-color description-divs-color mutual-titles-color">Government issued travel document</div>' +
            '</div>';
    } else {
        newDiv1_1 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
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
    if (data["DS2019Exists"] === true) {
        console.log("Exists");
        newDiv11 = '<div class="" style="padding-bottom: 20px;">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';
        if (data["DS2019Status"] === "A") {
            newDiv11 += '<div id="ds2019Status" class="main-divs-color mutual-titles-color blue-text">DS-2019</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv11 +=
                '</div>' +
                '<img data-number="11" title="Download DS-2019" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv11 +=
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(11);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(11);">';
        } else if (data["DS2019Status"] === "R") {
            console.log("ExistsR");


            newDiv11 += '<div id="ds2019Status" class="main-divs-color mutual-titles-color ">DS-2019</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv11 +=
                '<img data-number="11" title="Upload DS-2019" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv11 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(11);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(11);">';
        }
        else {
            newDiv11 +=
                '<div id="ds2019Status" class="main-divs-color mutual-titles-color blue-text">DS-2019</div>';
            newDiv11 +=
                '</div>' +
                '<img data-number="11" title="Download DS-2019" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv11 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(11);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(11);">';
        }


        newDiv11 +=
            '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
            '</div>';

    } else {
        newDiv11 = '<div class="" style="padding-bottom: 20px;">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div id="ds2019Status" class="main-divs-color mutual-titles-color">DS-2019</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="11" title="Upload DS-2019" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
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
            if (data["DS160ConfirmationExists"] === true) {
        newDiv12 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';

        if (data["DS160ConfirmationStatus"] === "A") {
            newDiv12 += '<div id="" class="main-divs-color mutual-titles-color blue-text">DS-160 Confirmation</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv12 +=
                '</div>' +
                '<img data-number="12" title="Download DS-160 Confirmation" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv12 +=
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(12);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(12);">';
        } else if (data["DS160ConfirmationStatus"] === "R") {
            newDiv12 += '<div id="" class="main-divs-color mutual-titles-color">DS-160 Confirmation</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv12 +=
                '</div>' +
                '<img data-number="12" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
            newDiv12 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(12);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(12);">';
        } else {
            newDiv12 += '<div id="" class="main-divs-color mutual-titles-color blue-text">DS-160 Confirmation</div>' + '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv12 +=
                '</div>' +
                '<img data-number="12" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">';

            newDiv12 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(12);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(12);">';
        }
        newDiv12 +=

            '</div>' +
            '</div>' +
            '<div class="main-divs-color description-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
            '</div>';
    }
    else {
        newDiv12 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div class="main-divs-color mutual-titles-color">DS-160 Confirmation</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="12" title="Upload DS-160" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
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

                    if (data["SevisFeePaymentReceiptExists"] === true) {
                        newDiv15 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">';
                
                        if (data["SevisFeePaymentReceiptStatus"] === "A") {
                            newDiv15 += '<div id="SevisFeePaymentReceiptStatus" class="main-divs-color mutual-titles-color blue-text">Sevis Fee Payment Receipt</div>' + '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv15 += '</div>' +
                                '<img data-number="13" data-document-id="13" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv11 += '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(13);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(13);">';
                        } else if (data["SevisFeePaymentReceiptStatus"] === "R") {
                            newDiv15 += '<div id="SevisFeePaymentReceipt" class="main-divs-color mutual-titles-color">Sevis Fee Payment Receipt</div>' + '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                            newDiv15 += '</div>' +
                                '<img data-number="13" title="Upload Sevis Fee Payment Receipt" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv15 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(13);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(13);">';
                        } else {
                            newDiv15 +=
                                '<div id="SevisFeePaymentReceiptStatus" class="main-divs-color mutual-titles-color blue-text">Sevis Fee Payment Receipt</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv15 += '</div>' +
                                '<img data-number="13" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv15 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(13);">' +
                                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(13);">';
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
                            '<img data-number="13" title="Upload Sevis Fee Payment Receipt" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
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
                            newDiv16 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(16);">' +
                                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
                        } else {
                            newDiv16 +=
                                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv16 += '</div>' +
                                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                                '<div class="div_replacement" style="display: none; justify-content: space-between;">';
                            newDiv16 += '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(16);">' +
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
    $('#usEmbassydocumentList').append(newDiv1_1, newDiv11, newDiv12, newDiv14, newDiv15, newDiv16, newDiv17, newDiv18, newDiv19, newDiv20); 


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










    // End documents



    $('.three-dots-document').click(function () {
        if ($(".open-popup").css("display") === "block") {
            $(".open-popup").css("display", "none");
            $(".div_replacement").css("display", "flex");
            $(".img-zip-download").hide();
        } else {
            $(".open-popup").css("display", "block");
            $(".div_replacement").css("display", "none");
            $(".img-zip-download").show();

        }
    });





    if (data["userExpCount"] != "0") {
        for (let i = 0; i < data["userExpCount"]; i++) {
            var title = "title" + i
            var company = "company" + i
            var location = "cityexp" + i
            var date = "date" + i



            $('#UserExp').append($('<div class="experience-rows-img JSAdded" style="margin-top:30px;" id="asd"> <img class="experience-education-img" src="/static/img/worki_icons-18.jpg" alt="" title="Experience"><div class="experience-rows"><div class="experience-first-row" id="titleExp">' + data[title] + '</div><div class="experience-second-row" id="Compexp1">' + data[company] + '</div><div class="experience-third-row" id="Locexp1">' + data[location] + '</div><div class="experience-fourth-row" id="date1">' + data[date] + '</div></div></div>'));
        }

    }



    if (data["userEduCount"] != "0") {
        for (let i = 0; i < data["userEduCount"]; i++) {
            var university = "university" + i;
            var uniField = "field" + i;
            var uniloc = "uniloc" + i
            var uniYear = "unidate" + i
            $('#UserEdu').append($('<div class="experience-rows-img JSAdded" style="margin-top:30px;"><img class="experience-education-img" src="/static/img/worki_icons-19.jpg" alt="" title="Education"><div class="experience-rows"><div class="experience-first-row" id="university">' + data[university] + '</div><div class="experience-second-row" id="uniField">' + data[uniField] + '</div><div class="experience-third-row" id="uniLoc">' + data[location] + '</div><div class="experience-fourth-row" id="uniYear">' + data[uniYear] + '</div></div></div>'));
        }



    }
    if (data["countLang"] != "0") {
        for (let i = 0; i < data["countLang"]; i++) {
            var lang = "language" + i;
            var level = "languageLevel" + i;
            $('#UserLang').append($('<div style="" class="experience-rows-img-languages JSAdded" style="margin-top:30px;"><div class="education-second-paragraph">' + data[lang] + '</div><div class="language-rate">' + data[level] + '</div></div></div>'));
        }

    }
    var firstMediaQuery = window.matchMedia('(min-width: 768px');
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
    var right_jobs = document.querySelector('.right-jobs');
    var jobs_left = document.querySelector('.job-left');
    var jobs_buttons = document.querySelector('.jobs-buttons');


    if (mediaQuery.matches) {
        right_jobs_main_div.style.display = "flex";
        right_jobs.style.display = "flex";
        jobs_left.style.display = "none";
        jobs_buttons.style.display = "none";
        if (id == 0) {
            var select = document.getElementById('select' + id)
            select.style.backgroundColor = "white";
        }
    } else {
        if (id != 0) {
            var select = document.getElementById('select' + id)
            select.style.backgroundColor = "#E7F1FE";
        }

        if (id == 0) {
            id = data["post_id"]
            var select = document.getElementById('select' + id)
            select.style.backgroundColor = "#E7F1FE";
        }
    }
    ;
}
const mediaQuery = window.matchMedia('(max-width: 767px)');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
var right_jobs = document.querySelector('.right-jobs');
var jobs_left = document.querySelector('.jobs-left');
var jobs_buttons = document.querySelector('.jobs-buttons');
if (mediaQuery.matches) {
    right_jobs_main_div.style.display = "none";
    right_jobs.style.display = "none";
    jobs_left.style.display = "flex";
    jobs_buttons.style.display = "flex";
}
else {
    var c = document.getElementById("sectedUser").value;

    getUser(c);
}
