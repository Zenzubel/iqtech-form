'use strict';
document.addEventListener('DOMContentLoaded', () => {

	const body = document.querySelector('body');

		const form = function() {

		const formBody = document.querySelector('.form-body-js');
		const getForm = document.querySelector('#form-core'),
		getInputCompanyName = getForm.querySelector('#input-company-name'),
		getInputInn = getForm.querySelector('#input-inn'),
		getInputContact = getForm.querySelector('#input-contact'),
		getInputSity = getForm.querySelector('#input-sity'),
		getInputDate = getForm.querySelector('#input-date'),
		getButton = getForm.querySelector('#button');

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
					let result = await response.json();
					getForm.reset();
				}
			}
		}

		function formValidate() {
			let error = 0;
			const getInputCompanyNameValue = getInputCompanyName ? getInputCompanyName.value.trim() : false;
			const getInputInnValue = getInputInn ? getInputInn.value.trim() : false;
			const getInputContactValue = getInputContact ? getInputContact.value.trim() : false;
			const getInputSityValue = getInputSity ? getInputSity.value.trim() : false;
			const getInputDateValue = getInputDate ? getInputDate.value.trim() : false;

			if (getInputCompanyNameValue === '' || getInputCompanyNameValue === null || getInputCompanyNameValue.match(/[a-z]/i)) {

				addError(getInputCompanyName);
				error++;
			} else {
				addComplete(getInputCompanyName);
			}

			if (getInputInnValue === '' || getInputInnValue === null || getInputInnValue.length < 10 || getInputInnValue.length > 12) {
				addError(getInputInn);
				error++;
			}

			else {
				addComplete(getInputInn);
			}

			if (getInputContact) {
				if (getInputContactValue === '' || getInputContactValue === null) {
					addError(getInputContact);
					error++;
				}
				else {
					addComplete(getInputContact);
				}
			}

			if (getInputSity) {
				if (getInputSityValue === '' || getInputSityValue === null) {
					addError(getInputSity);
					error++;
				}
				else {
					addComplete(getInputSity);
				}
			}

			if (getInputDate) {
				if (getInputDateValue === '' || getInputDateValue === null) {
					addError(getInputDate);
					error++;
				}
				else {
					addComplete(getInputDate);
				}
			}


			return error;
		}

		function addError (input) {
			input.parentElement.classList.add('error');
			let text = input.parentElement.nextElementSibling.innerHTML;

			if (input === getInputCompanyName) {
				input.parentElement.nextElementSibling.innerHTML = '';
				input.parentElement.nextElementSibling.innerHTML = 'Поле заполнено не корректно';
				input.parentElement.nextElementSibling.style.cssText = `color: rgba(252, 45, 45, 1);`;
			}

			if (input === getInputInn) {
				input.parentElement.nextElementSibling.innerHTML = '';
				input.parentElement.nextElementSibling.innerHTML = 'ИНН должен содержать от 10 до 12 цифр <br> Введенный ИНН не прошел проверку по контрольным цифрам';
				input.parentElement.nextElementSibling.style.cssText = `color: rgba(252, 45, 45, 1);`;
			}

			if (input === getInputContact) {
				input.parentElement.nextElementSibling.innerHTML = '';
				input.parentElement.nextElementSibling.innerHTML = 'Поле пустое';
				input.parentElement.nextElementSibling.style.cssText = `color: rgba(252, 45, 45, 1);`;
			}

			if (input === getInputSity) {
				input.parentElement.nextElementSibling.innerHTML = '';
				input.parentElement.nextElementSibling.innerHTML = 'Поле пустое';
				input.parentElement.nextElementSibling.style.cssText = `color: rgba(252, 45, 45, 1);`;
			}

			if (input === getInputDate) {
				input.parentElement.nextElementSibling.innerHTML = '';
				input.parentElement.nextElementSibling.innerHTML = 'Введите дату';
				input.parentElement.nextElementSibling.style.cssText = `color: rgba(252, 45, 45, 1);`;
			}
		}

		function addComplete (input) {
			input.parentElement.classList.add('complete');
			input.parentElement.nextElementSibling.innerHTML = 'Данные поля приняты';
			input.parentElement.nextElementSibling.style.cssText = `color: green;`;
		}
	};
	form();
});
