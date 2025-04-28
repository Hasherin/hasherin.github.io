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
	const backgroundInterval = 10000; // 10 seconds
	let allImagesPreloaded = false;

	function preloadImages(imagePaths, callback) {
		let loadedCount = 0;
		const totalImages = imagePaths.length;
		const images = [];

		imagePaths.forEach((path, index) => {
			images[index] = new Image();
			images[index].src = path;
			images[index].onload = () => {
				loadedCount++;
				if (loadedCount === totalImages) {
					callback();
				}
			};
			images[index].onerror = () => {
				console.error(`Failed to load image: ${path}`);
			};
		});
	}

	function updateBackground() {
		const images = body.classList.contains('darkmode') ? darkImages : lightImages;
		body.style.backgroundImage = `url('${images[currentImage]}')`;
		currentImage = (currentImage + 1) % images.length;
	}

	function startBackgroundRotation() {
		updateBackground();
		setInterval(updateBackground, backgroundInterval);
	}

	const allImages = [...lightImages, ...darkImages];
	preloadImages(allImages, () => {
		console.log('All images preloaded.');
		allImagesPreloaded = true;
		startBackgroundRotation();
	});
});

function copyToClipboard(text) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			alert("IP cím kimásolva");
		})
		.catch((err) => {
			alert("Nem sikerült kimásolni az IP címet: " + err);
		});
}
