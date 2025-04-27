document.addEventListener('DOMContentLoaded', () => {
	const body = document.body;
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (prefersDarkScheme) {
		body.classList.add('darkmode');
	} else {
		body.classList.remove('darkmode');
	}

	const lightImages = [
		'images/light/comp-light.png',
		'images/light/parl-light.png',
		'images/light/shrine-light.png',
		'images/light/spawn-light.png'
	];

	const darkImages = [
		'images/dark/comp-dark.png',
		'images/dark/parl-dark.png',
		'images/dark/shrine-dark.png',
		'images/dark/spawn-dark.png'
	];

	let currentImage = 0;
	const backgroundInterval = 10000;

	function updateBackground() {
		const images = body.classList.contains('darkmode') ? darkImages : lightImages;
		body.style.backgroundImage = `url('${images[currentImage]}')`;
		currentImage = (currentImage + 1) % images.length;
	}

	updateBackground();
	setInterval(updateBackground, backgroundInterval);
});

function copyToClipboard(text) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			alert("IP cím kimásolva");
		})
		.catch((err) => {
			alert("Nem sikerült kimásolni az IP címet: ", err);
		});
}