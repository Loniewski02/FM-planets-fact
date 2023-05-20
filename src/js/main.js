const burgerBtn = document.querySelector('.nav__burger-btn');
const navItems = document.querySelector('.nav__items');
const allNavItems = navItems.querySelectorAll('.nav__items-item');
const allSections = document.querySelectorAll('.planet');
const planetBtns = document.querySelectorAll('.planet__btns-panel-btn');
const mobilePlanetBtns = document.querySelectorAll('.mobile-btns-panel__btn');
const planetText = document.querySelectorAll('.planet__info-text');
const planetSource = document.querySelectorAll('.planet__info-source a');
const rotation = document.querySelector('.rotation');
const revolution = document.querySelector('.revolution');
const radius = document.querySelector('.radius');
const temperature = document.querySelector('.temp');
const URL = 'data.json';

const planetOffsets = {
	'nav__items-item--mercury': '0%',
	'nav__items-item--venus': '200%',
	'nav__items-item--earth': '400%',
	'nav__items-item--mars': '600%',
	'nav__items-item--jupiter': '800%',
	'nav__items-item--saturn': '1000%',
	'nav__items-item--uranus': '1200%',
	'nav__items-item--neptune': '1400%',
};

const handleNav = () => {
	if (!burgerBtn.classList.contains('nav__burger-btn--active')) {
		showBurgerBtnClose();
	} else {
		hideBurgerBtnClose();
	}
	burgerBtn.classList.toggle('nav__burger-btn--active');
	navItems.classList.toggle('nav__items--active');

	allNavItems.forEach(item =>
		item.addEventListener('click', () => {
			burgerBtn.classList.remove('nav__burger-btn--active');
			navItems.classList.remove('nav__items--active');
			hideBurgerBtnClose();
		})
	);
};

async function handleData() {
	const response = await axios.get(URL);
	const data = response.data;
	try {
		const firstImg = document.querySelectorAll('.planet__imgs-img--first');
		const secondImg = document.querySelectorAll('.planet__imgs-img--second');
		const popupImg = document.querySelectorAll('.planet__imgs-img--popup');
		const planetTitle = document.querySelectorAll('.planet__info-title');

		for (let i = 0; i < data.length; i++) {
			firstImg[i].setAttribute('src', `${data[i].images.planet}`);
			secondImg[i].setAttribute('src', `${data[i].images.internal}`);
			popupImg[i].setAttribute('src', `${data[i].images.geology}`);
			planetTitle[i].textContent = data[i].name;
			planetText[i].textContent = data[i].overview.content;
			planetSource[i].setAttribute('href', `${data[i].overview.source}`);
		}
	} catch (error) {
		console.error(error);
	}
}

async function handleBottomInfo() {
	const response = await axios.get(URL);
	const data = response.data;
	try {
		for (let i = 0; i < data.length; i++) {
			if (
				allNavItems[i].classList.contains('nav__items-item--active') &&
				allNavItems[i].classList.contains(`nav__items-item--${data[i].name.toLowerCase()}`)
			) {
				rotation.textContent = data[i].rotation;
				radius.textContent = data[i].radius;
				revolution.textContent = data[i].revolution;
				temperature.textContent = data[i].temperature;
			}
		}
	} catch (error) {
		console.error(error);
	}
}

async function handlePlanetInfo(btn, func) {
	const response = await axios.get(URL);
	const data = response.data;
	try {
		for (let i = 0; i < data.length; i++) {
			if (
				allNavItems[i].classList.contains('nav__items-item--active') &&
				allNavItems[i].classList.contains(`nav__items-item--${data[i].name.toLowerCase()}`)
			) {
				const btns = document.querySelectorAll(`.planet__btns-panel--${data[i].name.toLowerCase()} button`);
				const mobileBtns = document.querySelectorAll(`.mobile-btns-panel--${data[i].name.toLowerCase()} button`);
				if (btn.classList.contains('planet__btns-panel-btn')) {
					btns.forEach(btn => {
						btn.classList.remove('planet__btns-panel-btn--active');
					});
					btn.classList.add('planet__btns-panel-btn--active');
				} else if (btn.classList.contains('mobile-btns-panel__btn')) {
					mobileBtns.forEach(btn => {
						btn.classList.remove('mobile-btns-panel__btn--active');
					});
					btn.classList.add('mobile-btns-panel__btn--active');
				}
				let content, source;

				if (btn.classList.contains('overview-btn')) {
					gsap.to(`.first-${data[i].name.toLowerCase()}`, {
						duration: 0.5,
						opacity: 1,
					});
					gsap.to(`.second-${data[i].name.toLowerCase()}`, {
						duration: 0.5,
						opacity: 0,
					});
					gsap.to(`.popup-${data[i].name.toLowerCase()}`, {
						duration: 0.5,
						opacity: 0,
						y: '0%',
					});
					content = data[i].overview.content;
					source = data[i].overview.source;
				} else if (btn.classList.contains('structure-btn')) {
					gsap.to(`.second-${data[i].name.toLowerCase()}`, {
						duration: 0.5,
						opacity: 1,
					});
					gsap.to(`.first-${data[i].name.toLowerCase()}`, {
						duration: 0.5,
						opacity: 0,
					});
					gsap.to(`.popup-${data[i].name.toLowerCase()}`, {
						duration: 0.5,
						opacity: 0,
						y: '0%',
					});
					content = data[i].structure.content;
					source = data[i].structure.source;
				} else if (btn.classList.contains('geology-btn')) {
					gsap.to(`.second-${data[i].name.toLowerCase()}`, {
						duration: 0.5,
						opacity: 0,
					});
					gsap.to(`.first-${data[i].name.toLowerCase()}`, {
						duration: 0.5,
						opacity: 1,
					});
					gsap.to(`.popup-${data[i].name.toLowerCase()}`, {
						duration: 0.5,
						opacity: 1,
						y: '85%',
					});
					content = data[i].geology.content;
					source = data[i].geology.source;
				}

				planetText[i].textContent = content;
				planetSource[i].setAttribute('href', source);
			}
		}
	} catch (error) {
		console.error(error);
	}
}

const slide = w => {
	gsap.to('.planet__main , .footer , .mobile-btns-panel', {
		duration: 0.1,
		opacity: 0,
		visibility: 'hidden',
	});
	gsap.to('.main', {
		duration: 2,
		right: w,
	});
	gsap.to('.planet__main , .footer , .mobile-btns-panel', {
		duration: 0.5,
		delay: 2,
		opacity: 1,
		visibility: 'visible',
	});
};

const showBurgerBtnClose = () => {
	gsap.to('.nav__burger-btn-bars', { duration: 0.2, bottom: 0 });
	gsap.to('.nav__burger-btn-bars--middle', { duration: 0.1, opacity: '0', bottom: 0 });
	gsap.to('.nav__burger-btn-bars--top', { duration: 0.1, delay: 0.2, y: -7, rotation: 45 });
	gsap.to('.nav__burger-btn-bars--bottom', { duration: 0.1, delay: 0.2, y: -7, rotation: -45 });
};

const hideBurgerBtnClose = () => {
	gsap.to('.nav__burger-btn-bars--top', { duration: 0.2, y: 0, rotation: 0 });
	gsap.to('.nav__burger-btn-bars--bottom', { duration: 0.2, y: 0, rotation: 0 });
	gsap.to('.nav__burger-btn-bars--middle', { duration: 0.1, delay: 0.3, opacity: '1' });
	gsap.to('.nav__burger-btn-bars--middle', { duration: 0.2, delay: 0.3, bottom: '7px' });
	gsap.to('.nav__burger-btn-bars--top', { duration: 0.2, delay: 0.3, bottom: '14px' });
};

burgerBtn.addEventListener('click', handleNav);

allNavItems.forEach(item => {
	item.addEventListener('click', e => {
		handleBottomInfo();
		allNavItems.forEach(item => item.classList.remove('nav__items-item--active'));
		item.classList.add('nav__items-item--active');
		const target = e.currentTarget;
		const classList = target.classList;
		for (const className of classList) {
			const offset = planetOffsets[className];
			if (offset) {
				slide(offset);
				break;
			}
		}
	});
});

planetBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		const target = e.target.closest('button');
		handlePlanetInfo(target);
	});
});

mobilePlanetBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		const target = e.target.closest('button');

		handlePlanetInfo(target);
	});
});

document.addEventListener('DOMContentLoaded', () => {
	gsap.to('.hero-bg', {
		x: '-300vw',
		repeat: -1,
		ease: 'linear',
		duration: 180,
	});

	handleBottomInfo();
	handleData();
});
