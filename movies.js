$(document).ready(function () {

    //fragman getirir
    function getVideo(firstFRAGMANID) {
        $.getJSON("https://api.themoviedb.org/3/movie/" + firstFRAGMANID + "/videos?api_key=ff1a4244972c231af758c476c641ca0f", function (resultsFragman) {
            $(".fragman").append("<iframe src='https://www.youtube.com/embed/" + resultsFragman.results[0].key + "'></iframe>");
        });
    }


    //footer için en populer filmleri getirir
    $.getJSON("https://api.themoviedb.org/3/movie/popular?api_key=ff1a4244972c231af758c476c641ca0f&language=tr-TR&page=1", function (results) {


        $(".seeAllPopular").append("<div class=footerImg><img src='http://image.tmdb.org/t/p/w185/" + results.results[0].poster_path + "' />" + results.results[0].title + "</div>");
        $(".seeAllPopular").append("<div class=footerImg><img src='http://image.tmdb.org/t/p/w185/" + results.results[1].poster_path + "' />" + results.results[1].title + "</div>");
        $(".seeAllPopular").append("<div class=footerImg><img src='http://image.tmdb.org/t/p/w185/" + results.results[2].poster_path + "' />" + results.results[2].title + "</div>");
        $(".seeAllPopular").append("<div class=footerImg><img src='http://image.tmdb.org/t/p/w185/" + results.results[3].poster_path + "' />" + results.results[3].title + "</div>");
        $(".seeAllPopular").append("<div class=footerImg><img src='http://image.tmdb.org/t/p/w185/" + results.results[4].poster_path + "' />" + results.results[4].title + "</div>");

    });

    //en populer filmleri getirir
    $.getJSON("https://api.themoviedb.org/3/movie/popular?api_key=ff1a4244972c231af758c476c641ca0f&language=tr-TR&page=1", function (results) {
        var data = "";
        var pagination = "";
        var firstFRAGMANID = results.results[0].id;
        getVideo(firstFRAGMANID);

        $.each(results.results, function (key, value) {
            data += '<li>';
            data += '<div class="img-li" id="' + value.id + '" onclick="document.getElementById(\'id01\').style.display=\'block\'"><img src="http://image.tmdb.org/t/p/w185/' + value.poster_path + '" /></div>';
            data += '<div class="vote_average-li"> <p>IMDB:</p>' + value.vote_average + '</div>';
            data += '<div class="release_date-li"><p>Film Tarihi:</p>' + value.release_date + '</div>';
            data += '</li>';
            pagination += '<li>' + key + '</li>';
        });

        $('.images').append(data);
        $('.triggers').append(pagination);

        $('.img-li').click(function (e) {
            var id = $(this).attr('id');
            debugger;
            $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=ff1a4244972c231af758c476c641ca0f", function (resultsFragman) {
                $(".w3-iframe").html("<iframe src='https://www.youtube.com/embed/" + resultsFragman.results[0].key + "'></iframe>");
            });
        });

        var triggers = $('ul.triggers li');
        var images = $('ul.images li');
        var lastElem = triggers.length - 1;
        var mask = $('.mask ul.images');
        var imgWidth = images.width();
        var target;
        var timingRun;
        triggers.first().addClass('selected');
        mask.css('width', imgWidth * (lastElem + 1) + 'px');
        // Get the modal
        var modal = document.getElementById("myModal");

        function sliderResponse(target) {
            mask.stop(true, false).animate({ 'left': '-' + imgWidth * target + 'px' }, 300);
            triggers.removeClass('selected').eq(target).addClass('selected');
        }

        triggers.click(function () {

            if (!$(this).hasClass('selected')) {
                target = $(this).index();
                sliderResponse(target);
                resetTiming();
            }
        });
        $('.next').click(function () {

            target = $('.mask ul.triggers li.selected').index();
            target === lastElem ? target = 0 : target = target + 1;
            sliderResponse(target);
            resetTiming();
        });
        $('.prev').click(function () {

            target = $('.mask ul.triggers li.selected').index();
            lastElem = triggers.length - 1;
            target === 0 ? target = lastElem : target = target - 1;
            sliderResponse(target);
            resetTiming();
        });
        function sliderTiming() {
            target = $('ul.triggers li.selected').index();
            target === lastElem ? target = 0 : target = target + 1;
            sliderResponse(target);
        }
        function resetTiming() {
            clearInterval(timingRun);
            timingRun = setInterval(function () { sliderTiming(); }, 5000);
        }
    });

    //en son çıkan filmleri getirir
    // $.getJSON("https://api.themoviedb.org/3/movie/latest?api_key=ff1a4244972c231af758c476c641ca0f&language=tr-TR", function (latest) {
    //         $(".top").append('<tr>'+'<th>Film Adı'+'</th>'+'<td>'+latest.title + '</td>'+'</tr>');
    // });

    //en çok izlenen filmleri getirir
    $.getJSON("https://api.themoviedb.org/3/movie/top_rated?api_key=ff1a4244972c231af758c476c641ca0f&language=tr-TR&page=1", function (topResults) {
        var dataTopMovies = "";
        var pagination = "";


        $.each(topResults.results, function (key, value) {

            dataTopMovies += '<li>';
            dataTopMovies += '<div class="img-li" id="' + value.id + '" onclick="document.getElementById(\'id01\').style.display=\'block\'"><img src="http://image.tmdb.org/t/p/w185/' + value.poster_path + '" /></div>';
            dataTopMovies += '<div class="vote_average-li">' + '<p>IMDB:</p>' + value.vote_average + '</div>';
            dataTopMovies += '<div class="release_date-li">' + '<p>Film Tarihi:</p>' + value.release_date + '</div>';
            dataTopMovies += '</li>';
            pagination += '<li>' + key + '</li>';
        });
        $('.ozkan').append(dataTopMovies);
        $('.triggersfooter').append(pagination);


        $('.img-li').click(function (e) {
            var id = $(this).attr('id');
            debugger;
            $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=ff1a4244972c231af758c476c641ca0f", function (resultsFragman) {
                $(".w3-iframe").html("<iframe src='https://www.youtube.com/embed/" + resultsFragman.results[0].key + "'></iframe>");
            });
        });

        var triggersfooter = $('ul.triggersfooter li');
        var ozkan = $('ul.ozkan li');
        var lastElem = triggersfooter.length - 1;
        var footer = $('.footer ul.ozkan');
        var imgWidth = ozkan.width();
        var target;
        var timingRun;
        triggersfooter.first().addClass('selected');
        footer.css('width', imgWidth * (lastElem + 1) + 'px');

        function sliderResponse(target) {
            footer.stop(true, false).animate({ 'left': '-' + imgWidth * target + 'px' }, 300);
            triggersfooter.removeClass('selected').eq(target).addClass('selected');
        }

        triggersfooter.click(function () {

            if (!$(this).hasClass('selected')) {
                target = $(this).index();
                sliderResponse(target);
                resetTiming();
            }
        });
        $('.next-footer').click(function () {

            target = $('.footer ul.triggersfooter li.selected').index();
            target === lastElem ? target = 0 : target = target + 1;
            sliderResponse(target);
            resetTiming();
        });
        $('.prev-footer').click(function () {

            target = $('.footer ul.triggersfooter li.selected').index();
            lastElem = triggersfooter.length - 1;
            target === 0 ? target = lastElem : target = target - 1;
            sliderResponse(target);
            resetTiming();
        });
        function sliderTiming() {
            target = $('ul.triggersfooter li.selected').index();
            target === lastElem ? target = 0 : target = target + 1;
            sliderResponse(target);
        }
        function resetTiming() {
            clearInterval(timingRun);
            timingRun = setInterval(function () { sliderTiming(); }, 5000);
        }
    });



    //arama yapılan filmleri getirir
    $(".getMovies").click(function () {
        var movieName = $("input").val();
        $.getJSON("http://www.omdbapi.com/?t=" + movieName + "&apikey=1f543ccf", function (result) {
            $(".searchMoviesTop").addClass("border");
            $(".searchMoviesTop").append('<div>' + '<tr>' + '<th>' + "Film Yılı:" + ' ' + '</th>' + '<td>' + result.Year + '</td>' + '</tr>' + '</div');
            $(".searchMoviesTop").append('<div>' + '<tr>' + '<th>' + "Yazar:" + ' ' + '</th>' + '<td>' + result.Writer + '</td>' + '</tr>' + '</div');
            $(".searchMoviesTop").append('<div>' + '<tr>' + '<th>' + "Oyuncular:" + ' ' + '</th>' + '<td>' + result.Actors + '</td>' + '</tr>' + '</div');
            $(".searchMoviesTop").append('<div>' + '<tr>' + '<th>' + "İçerik:" + ' ' + '</th>' + '<td>' + result.Plot + '</td>' + '</tr>' + '</div');
            // $(".searchMoviesTop").append('<tr>'+'<th> Poster'+'</th>'+'<td>'+'<img src='+'http://image.tmdb.org/t/p/w185/"+result.Poster+"'+'/>'+'</td>'+'</tr>');         

        });
        $("html, body").animate({ scrollTop: $('.searchMoviesTop').offset().top }, 1000);
    });

    $(".popularMovies").click(function () {
        $("html, body").animate({ scrollTop: $('.images').offset().top }, 1000);
    });


    $(".latestMovies").click(function () {
        $.getJSON("https://api.themoviedb.org/3/movie/latest?api_key=ff1a4244972c231af758c476c641ca0f&language=tr-TR", function (latest) {
            $(".top").addClass("border");
            $(".top").append('<div>' + '<tr>' + '<th>' + "Film Adı:" + " " + '</th>' + '<td>' + latest.title + '</td>' + '</tr>' + '</div');
            $("html, body").animate({ scrollTop: $('.top').offset().top }, 1000);
        });
    });

    $(".topMovies").click(function () {
        $("html, body").animate({ scrollTop: $('.ozkan').offset().top }, 1000);
    });
});

