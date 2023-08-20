// Определение функции radioTitle
function radioTitle(trackTitle) {
    var bitrade = jQuery("#cmn-toggle-4").prop("checked") ? 256 : 128;
    var url = '//api.more.fm/api/get-icecast?stream=more' + bitrade;
var url = '//api.more.fm/api/get-icecast?stream=rnb';
	var url = '//api.more.fm/api/get-icecast?stream=rock';
	var url = '//api.more.fm/api/get-icecast?stream=acoustic';
	var url = '//api.more.fm/api/get-icecast?stream=classic';
	var url = '//api.more.fm/api/get-icecast?stream=music';
	var url = '//api.more.fm/api/get-icecast?stream=lounge';
	var url = '//api.more.fm/api/get-icecast?stream=jazz';
	var url = '//api.more.fm/api/get-icecast?stream=rnoeb';
	var url = '//api.more.fm/api/get-icecast?stream=depeche';

    $.ajax({
        tvar audioPlayer = document.getElementById('audioPlayer');
				var currentTitle = document.getElementById('currentTitle');
				var volumeRange = document.getElementById('volumeRange');
		
				function playTrack(trackSource, trackTitle) {
					audioPlayer.setAttribute('src', trackSource);
					currentTitle.innerHTML = trackTitle;
					audioPlayer.play();
		
					$.get('https://api.example.com/data', function(response) {
						console.log('Data:', response);
					});
				}
		
				$(document).on('click', '#playlist a', function(e) {
					e.preventDefault();
					var trackSource = $(this).attr('href');
					var trackTitle = $(this).data('title');
					playTrack(trackSource, trackTitle);
				});
		
				$(document).on('click', '#playBtn', function() {
					audioPlayer.play();
				});
		
				$(document).on('click', '#pauseBtn', function() {
					audioPlayer.pause();
				});
		
				$(document).on('click', '#stopBtn', function() {
					audioPlayer.pause();
					audioPlayer.currentTime = 0;
				});
		
				$(document).on('input', '#volumeRange', function() {
					audioPlayer.volume = volumeRange.value;
				});ype: 'GET',
        url: url,
        async: true,
        dataType: 'jsonp',
        jsonpCallback: 'parseMusic',
        success: function(response) {
            if (response && Object.keys(response).length > 0) {
                var url = response[Object.keys(response)[0]]['title'];
                var from = url.search('.mp3');
                var without_mp3 = url.substring(url.search('.mp3') + 4, url.length);
                var without_empty = without_mp3.replace(/^\s*/, '').replace(/\s*$/, '');
                var searchData = without_empty.split(' - ');

                $("#song_singer").val(searchData[0]);
                $("#song_name").val(searchData[1]);
            } else {
                console.error("No valid data found in the response.");
            }
        },
        error: function(e) {
            console.error("Error occurred:", e.message);
            console.log("Now playing:", trackTitle);
        }
    });
}


window.onload = function () {
	var playlists = document.querySelectorAll('.playlist'),
			audioPlayer = document.getElementById('audioPlayer'),
			currentTitle = document.getElementById('currentTitle'),
			trackDuration,
			trackIndex = 0,
			playPauseBtn = document.getElementById('playPauseBtn'),
			volPlusBtn = document.getElementById('volPlusBtn'),
			volMinusBtn = document.getElementById('volMinusBtn'),
			volIndicator = document.getElementById('volIndicator'),
			currentDuration = document.getElementById('currentDuration'),
			totalDuration = document.getElementById('totalDuration'),
			trackProgressBar = document.getElementById('trackProgressBar'),
			progressBar = document.getElementById("progressBar");

// Функция для воспроизведения трека
function playTrack(trackSource, trackTitle) {
    audioPlayer.setAttribute('src', trackSource);
    currentTitle.innerHTML = trackTitle; // Обновляем название трека
    playPauseBtn.innerHTML = '[PAUSE]';
    setTimeRange(audioPlayer);
    volIndicator.innerHTML = Math.round(audioPlayer.volume * 100) + '%';
    audioPlayer.oncanplay = audioPlayer.play();
    radioTitle(trackTitle); // Вызов функции radioTitle для отображения информации о треке
}


	function setTimeRange(player) {
			player.onloadeddata = function () {
				var totalDurHour = Math.floor(Math.floor(player.duration) / 3600),
				totalDurMin = Math.floor(Math.floor(player.duration / 60) % 60),
				totalDurSec = Math.floor(player.duration) % 60;
		trackDuration = player.duration * 1000;
		trackProgressBar.max = trackDuration.toFixed(0);
		trackProgressBar.value = 0;
		totalDuration.innerHTML = (totalDurHour < 10 ? '0' + totalDurHour : totalDurHour) +
				':' + (totalDurMin < 10 ? '0' + totalDurMin : totalDurMin) +
				':' + (totalDurSec < 10 ? '0' + totalDurSec : totalDurSec);
		currentDuration.innerHTML = '00:00:00';
			};
	}

	function setActiveTrackClass(tracksArray, activeTrack) {
			var n;
			for (n = 0; n < tracksArray.length; n += 1) {
					tracksArray[n].classList.remove('activeTrack');
			}
			activeTrack.classList.add('activeTrack');
	}

	function clickToPlaySetter(playlistsArray, player) {
			var i, j, currentTrack, currentTracks, currentPlaylist, currentTrackSource, currentTrackTitle;
			for (i = 0; i < playlistsArray.length; i++) {
					currentPlaylist = playlistsArray[i];
					currentTracks = currentPlaylist.getElementsByTagName('a');
					for (j = 0; j < currentTracks.length; j += 1) {
							currentTrack = currentTracks[j];
							currentTrack.index = j;
							currentTrack.onclick = function (e) {
									e.preventDefault();
									currentTrackSource = this.getAttribute('href');
									currentTrackTitle = this.getAttribute('data-title');
									player.setAttribute('src', currentTrackSource);
									currentTitle.innerHTML = currentTrackTitle;
									trackIndex = this.index;
									playPauseBtn.innerHTML = '[PAUSE]';
									setTimeRange(player);
									volIndicator.innerHTML = Math.round(audioPlayer.volume * 100) + '%';
									player.oncanplay = player.play();
									setActiveTrackClass(currentTracks, this);
							};
					}
			}
	}

	function playNext() {
			if (playPauseBtn.innerHTML === '[PAUSE]') {
			if (trackIndex < (audioPlayer.playlist.length - 1)) {
					trackIndex += 1;
			} else {
					trackIndex = 0;
			}
			var nextTrack = audioPlayer.playlist[trackIndex];
			audioPlayer.setAttribute('src', nextTrack.href);
			currentTitle.innerHTML = nextTrack.getAttribute('data-title');
			setTimeRange(audioPlayer);
			if (playPauseBtn.innerHTML === '[PAUSE]') {
					audioPlayer.oncanplay = audioPlayer.play();
			}
			setActiveTrackClass(audioPlayer.playlist, nextTrack);
	}
}
	function updateTimeAndBar() {
			trackProgressBar.value = audioPlayer.currentTime * 1000;
		setCurrentDurationText(audioPlayer.currentTime, 1);
	}

	function setCurrentDurationText(elemDotMethod, divider) {
			var currentDurHour = Math.floor(Math.floor(elemDotMethod / divider) / 3600),
		currentDurMin = Math.floor(Math.floor((elemDotMethod / divider) / 60) % 60),
		currentDurSec = Math.floor(elemDotMethod / divider) % 60;
currentDuration.innerHTML = (currentDurHour < 10 ? '0' + currentDurHour : currentDurHour) +
		':' + (currentDurMin < 10 ? '0' + currentDurMin : currentDurMin) +
		':' + (currentDurSec < 10 ? '0' + currentDurSec : currentDurSec);
	}

	function playPauseToggle() {
			if (audioPlayer.currentSrc !== '') {
			if (audioPlayer.paused) {
					audioPlayer.oncanplay = audioPlayer.play();
					playPauseBtn.innerHTML = '[PAUSE]';
			} else {
					audioPlayer.pause();
					playPauseBtn.innerHTML = '[PLAY]';
			}
	}
	}

	function setVolume(volume) {
			audioPlayer.volume = Math.min(Math.max(0, volume), 1);
			volIndicator.innerHTML = Math.round(audioPlayer.volume * 100) + '%';
	}

	// Обработчик нажатия на кнопку воспроизведения/паузы
	playPauseBtn.onclick = function () {
			playPauseToggle();
	};

	// Обработчик увеличения громкости
	volPlusBtn.onclick = function () {
			setVolume(audioPlayer.volume + 0.05);
	};

	// Обработчик уменьшения громкости
	volMinusBtn.onclick = function () {
			setVolume(audioPlayer.volume - 0.05);
	};

	// Обработчик перемещения ползунка прогресса
	trackProgressBar.oninput = function () {
			audioPlayer.currentTime = trackProgressBar.value / 1000;
			setCurrentDurationText(trackProgressBar.value, 1000);
	};

	// Обработчик начала перемещения ползунка
	trackProgressBar.onmousedown = function () {
			audioPlayer.ontimeupdate = null;
			audioPlayer.onended = function () {
					audioPlayer.pause();
					playPauseBtn.innerHTML = '[PLAY]';
			};
	};

	// Обработчик окончания перемещения ползунка
	trackProgressBar.onmouseup = function () {
			audioPlayer.ontimeupdate = updateTimeAndBar;
			audioPlayer.onended = playNext;
	};

	// Здесь вызывается функция clickToPlaySetter для настройки обработчиков нажатий на треки
	clickToPlaySetter(playlists, audioPlayer);

	function updateProgressBar() {
			// Ваша функция обновления прогресс-бара (если нужна)
	}

	setInterval(function () {
			updateProgressBar();
			radioTitle();
	}, 5000);

	// Установка начального значения переключателя
	$("#cmn-toggle-4").prop("checked", true);
};
