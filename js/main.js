var audioPlayer = document.getElementById('audioPlayer');
		var currentTitle = document.getElementById('currentTitle');
		var volumeRange = document.getElementById('volumeRange');
var audioElement = document.getElementById('audioPlayer');

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
		});

// Скрыть элемент <audio>
audioElement.style.display = 'none';