const languages = [
    "Albanian",
    "Bosnian",
    "Bulgarian",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Estonian",
    "Finnish",
    "French",
    "German",
    "Greek",
    "Hungarian",
    "Icelandic",
    "Irish",
    "Italian",
    "Latvian",
    "Lithuanian",
    "Macedonian",
    "Maltese",
    "Montenegrin",
    "Norwegian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Serbian",
    "Slovak",
    "Slovenian",
    "Spanish",
    "Swedish",
    "Turkish",
    "Ukrainian",
];
const languageSelect = document.getElementById("id_language");

// Populate the select element with options
languages.forEach(language => {
    const option = document.createElement("option");
    option.value = language.toLowerCase();
    option.text = language;
    languageSelect.add(option);
});