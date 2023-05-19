const burgerBtn = document.querySelector('.nav__burger-btn');
const navItems = document.querySelector('.nav__items');
const allNavItems = navItems.querySelectorAll('.nav__items-item');
const allSections = document.querySelectorAll('.planet');
const rotation = document.querySelector('.rotation');
const revolution = document.querySelector('.revolution');
const radius = document.querySelector('.radius');
const temperature = document.querySelector('.temp');
const URL = 'data.json';

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

gsap.to('.hero-bg', {
	x: '-300vw',
	repeat: -1,
	ease: 'linear',
	duration: 180,
});

async function handleData() {
	const response = await axios.get(URL);
	try {
		console.log(response.data);
		createSection(response.data);
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

handleBottomInfo();

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

const createSection = data => {
	const arr = Array.from(allSections);
	for (let i = 0; i < data.length; i++) {
		const newPlanet = document.createElement('div');
		newPlanet.classList.add('wrapper');
		newPlanet.innerHTML = `
		<div class="mobile-btns-panel">
			<button class="mobile-btns-panel__btn">overview</button>
			<button class="mobile-btns-panel__btn">structure</button>
			<button class="mobile-btns-panel__btn">surface</button>
			<div class="border"></div>
		</div>

		<div class="planet__imgs planet__imgs--${data[i].name.toLowerCase()}">
			<img class="planet__imgs-img planet__imgs-img--first" src="${data[i].images.planet}"
				alt="">
			<img class="planet__imgs-img planet__imgs-img--second"
				src="${data[i].images.internal}" alt="">
			<img class="planet__imgs-img planet__imgs-img--popup" src="${data[i].images.geology}"
				alt="">
		</div>

		<div class="planet__main">
			<div class="planet__info">
				<h2 class="planet__info-title">${data[i].name}</h2>
				<p class="planet__info-text">${data[i].overview.content}</p>
				<p class="planet__info-source">Source: <a href="${data[i].overview.source}"
						target="_blank" rel="noopener noreferrer">Wikipedia</a> <img
						src="./dist/img/icons/icon-source.svg" alt=""></p>
			</div>
			<div class="planet__btns-panel">
				<button class="planet__btns-panel-btn planet__btns-panel-btn--active"><span>01</span>overview</button>
				<button class="planet__btns-panel-btn"><span>02</span>Internal structure</button>
				<button class="planet__btns-panel-btn"><span>03</span>surface geology</button>
			</div>
		</div>
	`;
		arr[i].appendChild(newPlanet);
	}
};

handleData();

burgerBtn.addEventListener('click', handleNav);
allNavItems.forEach(item => {
	item.addEventListener('click', e => {
		handleBottomInfo();
		allNavItems.forEach(item => item.classList.remove('nav__items-item--active'));
		item.classList.add('nav__items-item--active');
		const target = e.target;
		if (target.classList.contains('nav__items-item--mercury')) {
			slide('0%');
		} else if (target.classList.contains('nav__items-item--venus')) {
			slide('200%');
		} else if (target.classList.contains('nav__items-item--earth')) {
			slide('400%');
		} else if (target.classList.contains('nav__items-item--mars')) {
			slide('600%');
		} else if (target.classList.contains('nav__items-item--jupiter')) {
			slide('800%');
		} else if (target.classList.contains('nav__items-item--saturn')) {
			slide('1000%');
		} else if (target.classList.contains('nav__items-item--uranus')) {
			slide('1200%');
		} else if (target.classList.contains('nav__items-item--neptune')) {
			slide('1400%');
		}
	});
});

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
