
$(".click-languages-three-dots").click(function() {
    if ($(".languages-images").css("display") === "none") {
        $(".languages-images").css("display", "block");
        $(".click-languages-three-dots").prop("title", "Hide 'Edit' and Delete buttons");
}
else {
    $(".languages-images").css("display", "none");
    $(".click-languages-three-dots").prop("title", "Show 'Edit' and 'Delete' buttons");

}
});

$(".click-education-three-dots").click(function() {
    if ($(".education-images").css("display") === "none") {
        $(".education-images").css("display", "block");
        $(".click-education-three-dots").prop("title", "Hide 'Edit' and 'Delete' buttons");
}
else {
    $(".education-images").css("display", "none");
    $(".click-education-three-dots").prop("title", "Show 'Edit' and 'Delete' buttons");
}
});

$(".click-experience-three-dots").click(function() {
    if ($(".experience-images").css("display") === "none") {
        $(".experience-images").css("display", "block");
        $(".click-experience-three-dots").prop("title", "Hide 'Edit' and 'Delete' buttons");
    }
    else {
        $(".experience-images").css("display", "none");
        $(".click-experience-three-dots").prop("title", "Show 'Edit' and 'Delete' buttons");

    }
});

