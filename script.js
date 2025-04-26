let mode = "light";
let timeout;
const images = ["comp", "parl", "shrine", "spawn"];
let themeSwitch;
let themeSwitchLight;
let themeSwitchDark;
let currentImage = 0;

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
	document
		.querySelector("#theme-switch")
		.addEventListener("click", () => switchBg(), false);
	if (mode == null) {
		mode = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
		localStorage.setItem("mode", mode);
	}

	themeSwitch = document.querySelector("#theme-switch");
	themeSwitchLight = document.querySelector("#theme-switch-light");
	themeSwitchDark = document.querySelector("#theme-switch-dark");
	themeButtonUpdate();

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
	themeButtonUpdate();
	localStorage.setItem("mode", mode);
	clearInterval(timeout);
	setBg();
}

function themeButtonUpdate() {
	switch (mode) {
		case "dark":
			themeSwitch.style.backgroundColor = "#000000";
			themeSwitchDark.style.display = "none";
			themeSwitchLight.style.display = "inline";
			break;
		case "light":
			themeSwitch.style.backgroundColor = "#EFEFEF";
			themeSwitchDark.style.display = "inline";
			themeSwitchLight.style.display = "none";
			break;
	}
}
