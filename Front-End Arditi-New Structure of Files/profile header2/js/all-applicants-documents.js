
  $(document).ready(function() {
    $(".bg-add-and-edit").click(function() {
        $(this).hide();
    $('#upload-form')[0].reset(); // Reset the form
    fileList.innerHTML="or drag and drop it here";
    });
});

  $('#id_document').on('change', function() {
    var fileInput = this.files[0];

    if (fileInput) {
      // Check the file extension
      var allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.svg'];
      var fileExtension = fileInput.name.slice(((fileInput.name.lastIndexOf(".") - 1) >>> 0) + 2);
      if (allowedExtensions.indexOf('.' + fileExtension.toLowerCase()) === -1) {
        // Invalid file extension, update the input border color
        $('#id_document').css('border', '2px solid red');
        $('#error').css('display', 'block');
        $('#error').css('color', 'red');
      } else {
        // Reset the input border color if the file is valid
        $('#error').css('display', 'none');

        $('#id_document').css('border', '1px solid #ffff');
      }
    }
  });

  $('#upload-form').submit(function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    $.ajax({
      type: 'POST',
      url: '/upload_documents/',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        $('.bg-add-and-edit').css("display", "none");

        $('#upload-form')[0].reset(); // Reset the form

      },
      error: function(response) {
        $('#status').text(response.responseJSON.error);
      }
    });
  });

        
                const dropArea = document.getElementById('drop-area');
                const fileInput = document.getElementById('id_document');
                const fileList = document.querySelector('#second-line');
                let uploadedFile = null;
        
                dropArea.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    dropArea.style.backgroundColor = '#f0f0f0';
                });
        
                dropArea.addEventListener('dragleave', () => {
                    dropArea.style.backgroundColor = 'red';
                });
        
                dropArea.addEventListener('drop', (e) => {
                    e.preventDefault();
                    dropArea.style.backgroundColor = '#ffffff';
                    const file = e.dataTransfer.files[0];
                    handleFile(file);
                });
        
                fileInput.addEventListener('change', () => {
                    const file = fileInput.files[0];
                    handleFile(file);
                });
        
                function handleFile(file) {
                    // Clear previously uploaded file
                    fileList.innerHTML = '';
                    uploadedFile = null;
        
                    if (file) {
                        fileList.innerHTML=`${file.name}`;
                        uploadedFile = file;
                    }
                }
        
                function formatSize(bytes) {
                    if (bytes < 1024) {
                        return bytes + " bytes";
                    } else if (bytes < 1048576) {
                        return (bytes / 1024).toFixed(1) + " KB";
                    } else if (bytes < 1073741824) {
                        return (bytes / 1048576).toFixed(1) + " MB";
                    } else {
                        return (bytes / 1073741824).toFixed(1) + " GB";
                    }
                }
        
                // Add a click event listener to the drop area to trigger the file input
                dropArea.addEventListener('click', () => {
                    fileInput.click();
                });


                $(document).ready(function() {
                    var mobileMediaQuery = window.matchMedia('(max-width: 890px)');
                    var overMobileMediaQuery = window.matchMedia('(min-width: 891px)');
                    $('.job-left-row').click(function() {

                        if (mobileMediaQuery.matches) {
                        $('.job-left').hide();
                        $('.right-jobs-main-div').show();
                        // $('.documents-for-work-permit-form-content').show();
                        $('.your-work-permit-is-here-form-content').hide();
                        $('.profileHeader').hide();
                        $('.main-buttons-div').hide();  

                    };
            
            //    $(this).contents().wrap('<a href="http://www.worki.global"></a>');

            if (overMobileMediaQuery.matches) {
                        $(".job-left-row").removeClass("different-background-jobs");
                // Add the 'active' class to the clicked div
                $(this).addClass("different-background-jobs");
            }
                        var Applicantnumber = $(this).data('number'); // Get the number from the data attribute of the clicked button
                        var index = $(this).data('number');

                        $('.documents-for-work-permit-form-content').data('sourceDiv', $(this));
            $('#applicantID').val(Applicantnumber); // Set the value of the input field in your popup
    
    // Open the .open-this-div element with the corresponding index
    $('.title_documents').text('Documents for Work Permit' + index).show();
    $('.work-permit-title').text('Your Work Permit is Here' + index).show();
            // $(".title_documents").text($(".title_documents").text() + count_number);
            // count_number++;
                                    // $('.documents-for-work-permit-form-content').show();

            $('.your-work-permit-is-here-form-content').hide();
            
            console.log(Applicantnumber);
            // console.log($('.documents-for-work-permit-form-content'));
                    })

                    $('.myjob-right-exit').click(function() {
                            if (mobileMediaQuery.matches) {
                                $('.job-left').css("display", "block");
                                $('.right-jobs-main-div').css("display", "none");
                                $('.profileHeader').show();
                                $('.main-buttons-div').show();
                                $(".job-left-row").removeClass("different-background-jobs");


                            }
                        })
                    $('.documents-for-work-permit-form-content').click(function() {
    // Get the source .div element
    var sourceDiv = $(this).data('sourceDiv');
    
    // Check if the sourceDiv is defined
    if (sourceDiv) {
      // You can access the index of the source div if needed
      var index = $('.job-left-row').index(sourceDiv);
      console.log('Opened from .job-left-row clicked index: ' + index);
    }
  });

    });

    $(document).ready(function() {
        
        if (window.innerWidth >= 891){
            $('.job-left-row').eq(0).click();
        }
    });

$(".under-container-mutual-mutual-stats").click(function(event) {
        event.stopPropagation();
});

// const nr_of_applicants = document.getElementById("nr_of_applicants");
// const job_left_applicants = document.querySelectorAll(".job-left-row");

// nr_of_applicants.innerHTML = job_left_applicants.length;

// $("#nr_of_applicants").text($(".job-left-row").length);

var applicantsCount = $(".job-left-row").length;
var buttonText = $(".nr_of_applicants").text();
$(".nr_of_applicants").text(buttonText + " (" + applicantsCount + ")");
