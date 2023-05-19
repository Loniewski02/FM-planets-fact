const burgerBtn = document.querySelector('.nav__burger-btn');
const navItems = document.querySelector('.nav__items');
const allNavItems = navItems.querySelectorAll('.nav__items-item');
const allSections = document.querySelectorAll('.planet');
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
	x: '-200vw',
	repeat: -1,
	ease: 'linear',
	duration: 60,
});

async function handleData() {
	const response = await axios.get(URL);

	try {
		createSection(response.data);
	} catch (error) {
		console.error(error);
	}
}

const show = w => {
	gsap.to('.planet__main , .footer', {
		duration: 0.1,
		opacity: 0,
		visibility: 'hidden',
	});
	gsap.to('.main', {
		duration: 2,
		right: w,
	});
	gsap.to('.planet__main , .footer', {
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


		<div class="planet__imgs">
			<img class="planet__imgs-img planet__imgs-img--first" src="../dist/img/icons/planet-${data[i].name.toLowerCase()}.svg"
				alt="">
			<img class="planet__imgs-img planet__imgs-img--second"
				src="../dist/img/icons/planet-${data[i].name.toLowerCase()}-internal.svg" alt="">
			<img class="planet__imgs-img planet__imgs-img--popup" src="../dist/img/icons/geology-${data[i].name.toLowerCase()}.png"
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
				<button class="planet__btns-panel-btn"><span>01</span>overview</button>
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
		allNavItems.forEach(item => item.classList.remove('nav__items-item--active'));

		item.classList.add('nav__items-item--active');

		const target = e.target;
		if (target.classList.contains('nav__items-item--mercury')) {
			show('0%');
		} else if (target.classList.contains('nav__items-item--venus')) {
			show('200%');
		} else if (target.classList.contains('nav__items-item--earth')) {
			show('400%');
		} else if (target.classList.contains('nav__items-item--mars')) {
			show('600%');
		} else if (target.classList.contains('nav__items-item--jupiter')) {
			show('800%');
		} else if (target.classList.contains('nav__items-item--saturn')) {
			show('1000%');
		} else if (target.classList.contains('nav__items-item--uranus')) {
			show('1200%');
		} else if (target.classList.contains('nav__items-item--neptune')) {
			show('1400%');
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
