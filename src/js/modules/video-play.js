function videoCover() {
    var video = document.querySelectorAll('.video');

    video.forEach(b => b.addEventListener('click', function () {
        if (!b.classList.contains('active')) {
            b.classList.toggle('active');
            b.insertAdjacentHTML("afterbegin", '<video src="images/video-review/video.mp4"></video>')
        }
    }));
}

videoCover();
