'use strict';
document.addEventListener('DOMContentLoaded', () => {


	const form = function(num) {

		const formBody = document.querySelector(`#form-${num}`);
		const getForm = document.querySelector(`#form-core-${num}`),
		getInputName = getForm.querySelector(`#input-name-${num}`),
		getInputTel = getForm.querySelector(`#input-tel-${num}`),
		getInputEmail = getForm.querySelector(`#input-email-${num}`),
		getInputCheck = getForm.querySelector(`#input-cheсk-${num}`),
		getInputCheckFake = getForm.querySelector(`#input-cheсk-fake-${num}`),
		getButton = getForm.querySelector(`#button-${num}`);

		const compliteScreenMassage = document.querySelector('#complite-mess');

		compliteScreenMassage.addEventListener('click', ()=> {
			compliteScreenMassage.classList.remove('active');
			body.classList.remove('lock');
			window.location.reload();
		});

		getForm.addEventListener('submit', sendMail);

		async function sendMail (e) {
			e.preventDefault();

			let error = formValidate(getForm);

			let formData = new FormData(getForm);

			if (error === 0) {

				formBody.classList.add('sending');

				body.classList.add('lock');

				compliteScreenMassage.classList.add('active');

				//скрипт сервиса отправки//
				let response = await fetch ('sendmail.php', {
					method: 'POST',
					body: formData,
				});
				if (response.ok) {

					body.classList.remove('lock');
					// arroreMassage.classList.remove('error');

					let result = await response.json();
					getForm.reset();
				}
				else {}

			} else {
				// arroreMassage.classList.add('error');
			}
		}

		function formValidate () {
			let error = 0;
			const getInputNameValue = getInputName ? getInputName.value.trim() : false;
			const getInputTelValue = getInputTel ? getInputTel.value.trim() : false;
			const getInputEmailValue = getInputEmail ? getInputEmail.value.trim() : false;

			const checkTel = /^\d[\d\(\)\ -]{4,14}\d$/.test(getInputTelValue);
			const checkEmail = /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/.test(getInputEmailValue);

			if (getInputNameValue === '' || getInputNameValue === null) {
				addError(getInputName);
				error++;
			} else {
				addComplete(getInputName);
			}

			if (getInputTelValue === '' || getInputTelValue === null) {
				addError(getInputTel);
				error++;
			}
			else if (!checkTel) {
				addError(getInputTel);
				error++;
			} else {
				addComplete(getInputTel);
			}

			if (getInputEmailValue === '' || getInputEmailValue === null) {
				addError(getInputEmail);
				error++;
			}
			else if (!checkEmail) {
				addError(getInputEmail);
				error++;
			} 
			else {
				addComplete(getInputEmail);
			}

			if (!getInputCheck.checked) {
				getInputCheckFake.classList.add('error');
				error++;
			} else {
				getInputCheckFake.classList.remove('error');
			}

			return error;
		}

		function addError (input) {
			input.parentElement.classList.add('error');
		}

		function addComplete (input) {
			input.parentElement.classList.add('complete');
		}
	};
	form(1);

	//start form-1 in secyion 'send'//
	const formBodyComplite = document.querySelector('.form__send-complite-message');

	const getForm1 = document.querySelector('#form-1'),

		getLabelName1 = getForm1.querySelector('#label-name-1'),
		getLabelTel1 = getForm1.querySelector('#label-tel-1'),
		getLabelEmail1 = getForm1.querySelector('#label-email-1'),

		getInputName1 = getForm1.querySelector('#input-name-1'),
		getInputTel1 = getForm1.querySelector('#input-tel-1'),
		getInputEmail1 = getForm1.querySelector('#input-email-1'),

		getButton1 = getForm1.querySelector('#button-1');

		getForm1.addEventListener('submit', sendMail1);

	async function sendMail1 (e) {
		e.preventDefault();

		let error = formValidate1(getForm1);

		let formData = new FormData(getForm1);

		if (error === 0) {

			getForm1.classList.add('sending');
			formBodyComplite.classList.add('active');
			body.classList.add('lock');

			let response = await fetch ('sendmail.php', {
				method: 'POST',
				body: formData,
			});
			if (response.ok) {

				body.classList.remove('lock');

				let result = await response.json();
				getForm1.reset();
			}
			else {}

		} else {
			// alert('Заполните обязательные поля');
		}
	}

	function formValidate1 () {
		let error = 0;
		const getInputNameValue = getInputName1.value.trim();
		const getInputTelValue = getInputTel1.value.trim();
		const getInputEmailValue = getInputEmail1.value.trim();

		const checkTel = /^\d[\d\(\)\ -]{4,14}\d$/.test(getInputTelValue);
		const checkEmail = /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/.test(getInputTelValue);


		if (getInputNameValue === '' || getInputNameValue === null) {
			addError1(getInputName1, 'Заполните это поле');
			error++;
		} else {
			addComplete1(getInputName1, '');
		}

		if (getInputTelValue === '' || getInputTelValue === null) {
			addError1(getInputTel1, 'Заполните это поле');
		}
		else if (!checkTel) {
			addError1(getInputTel1, 'Некорректный номер телефона');
			error++;
		} else {
			addComplete1(getInputTel1, '');
		}

		if (getInputEmailValue === '' || getInputEmailValue === null) {
			addError1(getInputEmail1, 'Заполните это поле');
			error++;
		}
		else if (checkEmail) {
			addError1(getInputEmail1, 'Некорректный Email');
			error++;
		} else {
			addComplete1(getInputEmail1, '');
		}

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

});
