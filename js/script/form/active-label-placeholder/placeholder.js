	//start hide label-placeholder in form
	const formInput1 = document.querySelectorAll('.focus-js');

	if (formInput1) {

		formInput1.forEach((item, i)=> {
			item.addEventListener('focus', (event)=> {
				event.target.nextElementSibling.style.cssText = `opacity: 0;`;
			});

			item.addEventListener('blur', (event)=> {
				event.target.nextElementSibling.style.cssText = `opacity: 1;`;

				if (event.target.value.length > 0) {
					event.target.nextElementSibling.style.cssText = `opacity: 0;`;
				}
			});
		});
	}
	//end hide label-placeholder in form

	//start form-1 in secyion 'send'//
	const getForm1 = document.querySelector('#form-1'),

		getLabelName1 = getForm1.querySelector('#label-name-1'),
		getLabelTel1 = getForm1.querySelector('#label-tel-1'),
		getLabelEmail1 = getForm1.querySelector('#label-email-1'),
		// getLabelCheckFake1 = getForm1.querySelector('.cheсk-box__fake--1'),

		getInputName1 = getForm1.querySelector('#input-name-1'),
		getInputTel1 = getForm1.querySelector('#input-tel-1'),
		getInputEmail1 = getForm1.querySelector('#input-email-1'),
		// getInputCheck1 = getForm1.querySelector('#cheсk-box-1'),

		getButton1 = getForm1.querySelector('#button-1');

	getForm1.addEventListener('submit', (event) => {
		event.preventDefault();
		checkInputs1();
		sendMail1 ();
	});

	function sendMail1 () {
		let error = checkInputs1(getForm1);
		if (error === 0) {
			getForm1.classList.add('sending');
			
			body.classList.add('lock');
		} else {
			// alert('Заполните обязательные поля');
		}
	}

	function checkInputs1 () {
		let error = 0;
		const getInputName1Value = getInputName1.value.trim();
		const getInputTel1Value = getInputTel1.value.trim();
		const getInputEmail1Value = getInputEmail1.value.trim();

		const checkTel = /^\d[\d\(\)\ -]{4,14}\d$/.test(getInputTel1Value);
		const checkEmail = /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/.test(getInputTel1Value);


		if (getInputName1Value === '' || getInputName1Value === null) {
			addError1(getInputName1, 'Заполните это поле');
			error++;
		} else {
			addComplete1(getInputName1, '');
		}

		if (getInputTel1Value === '' || getInputTel1Value === null) {
			addError1(getInputTel1, 'Заполните это поле');
		}
		else if (!checkTel) {
			addError1(getInputTel1, 'Некорректный номер телефона');
			error++;
		} else {
			addComplete1(getInputTel1, '');
		}

		if (getInputEmail1Value === '' || getInputEmail1Value === null) {
			addError1(getInputEmail1, 'Заполните это поле');
			error++;
		}
		else if (checkEmail) {
			addError1(getInputEmail1, 'Некорректный Email');
			error++;
		} else {
			addComplete1(getInputEmail1, '');
		}

		// if (!getInputCheck1.checked) {
		// 	getLabelCheckFake1.classList.add('error');
		// 	error++;
		// } else {
		// 	getLabelCheckFake1.classList.remove('error');
		// }

		return error;
	}

	function createMassegeElement() {
		const parentEl = document.querySelectorAll('.form__label-box').forEach(item => {
			item.insertAdjacentHTML('beforeend', '<span class="form__massage"></span>');
		});
	}
	createMassegeElement();

	function addError1 (input, message) {
		input.classList.add('error');
		input.classList.remove('complete');

		const labelElement = input.parentElement;
		const messageError = labelElement.querySelector('.form__massage');
		messageError.innerText = message;

	}

	function addComplete1 (input, message) {
		input.classList.add('complete');
		input.classList.remove('error');

		const labelElement = input.parentElement;
		const messageError = labelElement.querySelector('.form__massage');
		messageError.innerText = message;
	}
	//end form-1 in secyion 'send'//