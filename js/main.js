$(function () {
    var word = GetWord();
    InitializeGuessedWord(word);
    ValidateLetter(word);
    AsignReplayButton();
});

// Initializes the guessed words and puts the value in the input field
function InitializeGuessedWord(word) {
    var guessedWord = '';

    for (var i = 0; i < word.length; i++) {
        guessedWord += '_';
    }

    guessedWord = AddSpacesToWord(guessedWord);

    $('#guessedWord').val(guessedWord);
}

// Adds spaces between every character of the input word and returns the result
function AddSpacesToWord(wordWithoutSpaces) {
    var guessedWordWithSpaces = '';

    for (var i = 0; i < wordWithoutSpaces.length - 1; i++) {
        guessedWordWithSpaces += wordWithoutSpaces[i] + ' ';
    }

    guessedWordWithSpaces += wordWithoutSpaces[wordWithoutSpaces.length - 1];

    return guessedWordWithSpaces;
}

// Removes the spaces in a given string and returns the result
function RemoveSpacesFromWord(wordWithSpaces) {
    return wordWithSpaces.replace(/ /g, '');
}

// Validates the letter that has been clicked on and adds the correct classes to the elements
// When the game ends, the correct actions are taken
function ValidateLetter(word) {
    var errors = 0;

    $('.letter').click(function (event) {
        event.preventDefault();

        var guessedWord = $('#guessedWord').val();
        guessedWord = RemoveSpacesFromWord(guessedWord);

        var clickedLetter = $(this);

        $('#icon-container').removeClass('glyphicon glyphicon-ok glyphicon-remove form-control-feedback');
        $('#icon-container').closest('.form-group').removeClass('has-feedback has-success has-error');

        var wordContainsLetter = false;

        for (var i = 0; i < word.length; i++) {
            var clickedLetterValue = clickedLetter.attr('href')[1];
            $('#chosenLetter').val(clickedLetter.text());

            if (word[i] === clickedLetterValue) {
                if (!wordContainsLetter) { // When this expression is true, it is the first time that this letter is encountered, so the classes should be added
                    $('#icon-container').addClass('glyphicon glyphicon-ok form-control-feedback');
                    $('#icon-container').closest('.form-group').addClass('has-feedback has-success');
                }

                guessedWord = guessedWord.substring(0, i) + clickedLetterValue + guessedWord.substring(i + clickedLetterValue.length);

                wordContainsLetter = true;
            }
        }

        if (wordContainsLetter) {
            $('#guessedWord').val(AddSpacesToWord(guessedWord));

            if (word === guessedWord) {
                $('.letter').addClass('disabled');

                $('#message').removeClass('hidden');
                $('#message > p:first-child').addClass('text-success').text('Proficiat! Je hebt het woord kunnen raden.');
            }
        } else {
            $('#icon-container').addClass('glyphicon glyphicon-remove form-control-feedback');
            $('#icon-container').closest('.form-group').addClass('has-feedback has-error');

            errors++;
            $('#gallow').attr('src', 'img/' + errors + '.jpg');

            if (errors >= 11) {
                $('.letter').addClass('disabled');

                $('#guessedWord').val(AddSpacesToWord(word));

                $('#message').removeClass('hidden');
                $('#message > p:first-child').addClass('text-danger').text('Jammer, maar je hebt het woord niet kunnen raden.');
            }
        }
        
        clickedLetter.addClass('invisible');
    });
}

// Reload the page (while forcing a get and clearing the cache) when clicking the 'replay'-button
function AsignReplayButton() {
    $('#button-replay').click(function () {
        window.location.reload(true);
    });
}

// Contains the list of possible words and picks a random one from the list
function GetWord() {
    var words = [
        'yolo',
        'nickelodeon',
        'televisie',
        'lego',
        'bloem',
        'smurfen',
        'minecraft',
        'volleybal',
        'zetel',
        'cool',
        'hyperventileren',
        'herfst',
        'wolf',
        'schaap',
        'geit',
        'ruimtevaarder',
        'woord',
        'yoghurt',
        'aardappel',
        'telefoon',
        'hoes',
        'rood',
        'printen',
        'verzenden',
        'kaarten',
        'zeggen',
        'kompanie',
        'kubus',
        'portaal',
        'zen',
        'willen',
        'dimensionieel',
        'kopie',
        'masker',
        'vorm',
        'mond',
        'silhouette',
        'specifiek',
        'verven',
        'schilderen',
        'spel',
        'bestand',
        'temple',
        'minuut',
        'plat',
        'duim',
        'symbool',
        'geschenk',
        'cadeau',
        'kopen',
        'afbeelding',
        'schoonmaken',
        'huis',
        'context',
        'top',
        'pijn',
        'erg',
        'paard'
    ];

    var wordIndex = Math.floor(Math.random() * words.length);

    return words[wordIndex];
}