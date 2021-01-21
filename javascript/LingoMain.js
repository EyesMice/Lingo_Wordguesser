$(document).ready(function () {
    var woordguess = false;
    var row = 1; var col = 1;
    var letter; var word; var words = new Array();
    var player = true;
    var score1 = 0; var score2 = 0;
    $.get('dictionary/lingoDict.txt', function (data) {
        words = data.split(',');
    });
    $('#startbtn').on('click', function () {
        if (!woordguess) {
            $('th').each(function () {
                $(this).html('.').css({
                    backgroundColor: 'transparent'
                });
            });
            if (player) {
                $('#player').text('Player 1');
            } else {
                $('#player').text('Player 2');
            }
            $('#score1').html('Score P1 <br>' + score1 + '</div>');
            $('#score2').html('Score P2 <br>' + score2 + '</div>');
            word = words[Math.floor(Math.random() * words.length)];
            letter = word.match(/\b(\w)/g);
            var startblock = $('#wordblock' + row + col);
            $(startblock).html(letter).css({
                borderColor: 'yellow'
            });
        }
        woordguess = true;
    });
    $(document).on('keydown', function (e) {
        if (woordguess) {
            // typ een letter
            if (e.which > 64 && e.which < 91) {
                $('#wordblock' + row + col).css({
                    borderColor: 'lightgrey'
                });
                if (col < 6) {
                    col++;
                }
                $('#wordblock' + row + col).html(String.fromCharCode(e.which)).css({
                    borderColor: 'yellow'
                });
            }
            // druk op backspace
            if (e.which == 8 && col >= 1) {
                if (col > 1) {
                    $('#wordblock' + row + col).css({
                        borderColor: 'lightgrey'
                    });
                }
                $('#wordblock' + row + col).html('.');
                col--;
                $('#wordblock' + row + col).css({
                    borderColor: 'yellow'
                });
            }
            // druk op enter
            if (e.which == 13) {
                //controleer woord
                var checkword;
                var wrdarr = word.split('');
                $('#wordrow' + row).each(function () {
                    checkword = $('#wordrow' + row + ' th').text();
                });
                $('#wordblock' + row + col).css({
                    borderColor: 'lightgrey'
                });
                var chkcol = 1;
                $('#wordrow' + row + ' th').each(function () {
                    if ($('#wordblock' + row + chkcol).text() === wrdarr[chkcol - 1]) {
                        $('#wordblock' + row + chkcol).css({
                            backgroundColor: 'red'
                        }).delay(500);
                    } else if (word.includes($('#wordblock' + row + chkcol).text())) {
                        $('#wordblock' + row + chkcol).css({
                            backgroundColor: 'yellow'
                        }).delay(500);
                    }
                    chkcol++;
                });
                if (checkword === word) {
                    alert('Goed!!!')
                    if (player) {
                        score1 = score1 + 10;
                        player = false;
                    } else {
                        score2 = score2 + 10;
                        player = true;
                    }
                    col = 1; row = 1;
                    woordguess = false;
                    $('#startbtn').trigger('click');
                } else {
                    row++;
                    if (row < 6) {
                        col = 1;
                        $('#wordblock' + row + col).html(letter).css({
                            borderColor: 'yellow'
                        });
                    } else {
                        alert('Game Over!!!! ' + word);
                        if (player) {
                            player = false;
                        } else {
                            player = true;
                        }
                        col = 1; row = 1;
                        woordguess = false;
                        $('#startbtn').trigger('click');
                    }
                }
            }
        }
    });
});
