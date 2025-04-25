let mode = "light";
let timeout;
const images = ["comp", "parl", "shrine", "spawn"];
let currentImage = 0

window.addEventListener("load", init, false);

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

function init() {
	mode = localStorage.getItem("mode");
    document.querySelector("#theme-switch").addEventListener('click', () => switchBg(), false);
	if (mode == null) {
		mode = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
		localStorage.setItem("mode", mode);
	}
    currentImage = 0;
	document.body.style.backgroundImage = `url('images/${mode}/${images[currentImage]}-${mode}.png')`;
	setBg();
}

function setBg() {
    document.body.style.backgroundImage = `url('images/${mode}/${images[currentImage]}-${mode}.png')`;
	timeout = setInterval(() => {
		currentImage = (currentImage + 1) % 4;
		document.body.style.backgroundImage = `url('images/${mode}/${images[currentImage]}-${mode}.png')`;
	}, 15000);
}

function switchBg() {
    mode = mode === "light" ? "dark" : "light";    
	localStorage.setItem("mode", mode);
	clearInterval(timeout);
	setBg();
}
