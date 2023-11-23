function orderValidator() {
  const recipientName = document.getElementById('orderRecipientName');
  const recipientTel = document.getElementById('recipientPhone');
  const recipientAdress = document.getElementById('orderRecipientAdress');
  const recipientNameText = document.getElementById('recipientNameText');
  const recipientTelText = document.getElementById('recipientPhoneText');
  const recipientAdressText = document.getElementById('recipientAdressText');

  const senderName = document.getElementById('orderSenderName');
  const senderTel = document.getElementById('orderSenderTel');
  const senderMail = document.getElementById('orderSenderMail');
  const senderNameText = document.getElementById('senderNameText');
  const senderTelText = document.getElementById('senderTelText');
  const senderMailText = document.getElementById('senderMailText');

  const postCard = document.getElementById('orderPostcard');
  const postCardText = document.getElementById('orderPostcardText');
  const textPostCardText = document.getElementById('textPostCardText');

  const coupon = document.getElementById('orderCoupon');
  const certificate = document.getElementById('orderCertificate');
  const couponText = document.getElementById('couponText');
  const certificateText = document.getElementById('certificateText');

  const buttonSubmit = document.querySelector('.order__button');

  function isFormValid() {
    const inputs = [
      recipientName,
      recipientTel,
      recipientAdress,
      senderName,
      senderTel,
      senderMail,
      postCard,
      postCardText,
      coupon,
      certificate,
    ];
    for (const input of inputs) {
      if (input.classList.contains('invalid')) {
        return false;
      }
    }
    return true;
  }

  function updateButtonSubmit() {
    if (isFormValid()) {
      buttonSubmit.disabled = false;
      buttonSubmit.classList.remove('invalid');
      buttonSubmit.classList.add('valid');
    } else {
      buttonSubmit.disabled = true;
      buttonSubmit.classList.remove('valid');
      buttonSubmit.classList.add('invalid');
    }
  }

  function validateAdress(adress) {
    const adressValid = /^ул\.[\p{L}\s\d]{3,28}$/u;
    return adressValid.test(adress);
  }

  function validatePhoneNumber(phoneNumber) {
    const phoneValid = /^\+\d{12}$/;
    return phoneValid.test(phoneNumber);
  }

  function validateEmail(email) {
    const emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailValid.test(email);
  }

  function validateCoupon(coupon) {
    const couponValid = /^\d{1,10}$/;
    return couponValid.test(coupon);
  }

  if (recipientName) {
    recipientName.addEventListener('input', () => {
      const name = recipientName.value.trim();
      if (name === '') {
        recipientName.classList.add('invalid');
        recipientNameText.textContent = 'Please enter your name';
      } else if (name.length <= 2) {
        recipientName.classList.add('invalid');
        recipientNameText.textContent = 'Less than 2 letters';
      } else if (name.length > 10) {
        recipientName.classList.add('invalid');
        recipientNameText.textContent = 'More than 10 letters';
      } else {
        recipientName.classList.remove('invalid');
        recipientNameText.textContent = '';
      }
      updateButtonSubmit();
    });
  }

  if (senderName) {
    senderName.addEventListener('input', () => {
      const name = senderName.value.trim();
      if (name === '') {
        senderName.classList.add('invalid');
        senderNameText.textContent = 'Please enter your name';
      } else if (name.length <= 2) {
        senderName.classList.add('invalid');
        senderNameText.textContent = 'Less than 2 letters';
      } else if (name.length > 10) {
        senderName.classList.add('invalid');
        senderNameText.textContent = 'More than 10 letters';
      } else {
        senderName.classList.remove('invalid');
        senderNameText.textContent = '';
      }
      updateButtonSubmit();
    });
  }

  if (recipientTel) {
    recipientTel.addEventListener('input', () => {
      const phone = recipientTel.value.trim();
      if (phone === '') {
        recipientTel.classList.add('invalid');
        recipientTelText.textContent = 'Please enter your phone number';
      } else if (phone.length > 13) {
        recipientTel.classList.add('invalid');
        recipientTelText.textContent = 'More than 13 numbers';
      } else if (!validatePhoneNumber(phone)) {
        recipientTel.classList.add('invalid');
        recipientTelText.textContent =
          'Invalid phone number format. Use format: +1234567890';
      } else {
        recipientTel.classList.remove('invalid');
        recipientTelText.textContent = '';
      }
      updateButtonSubmit();
    });
  }

  if (senderTel) {
    senderTel.addEventListener('input', () => {
      const phone = senderTel.value.trim();
      if (phone === '') {
        senderTel.classList.add('invalid');
        senderTelText.textContent = 'Please enter your phone number';
      } else if (phone.length > 13) {
        senderTel.classList.add('invalid');
        senderTelText.textContent = 'More than 13 numbers';
      } else if (!validatePhoneNumber(phone)) {
        senderTel.classList.add('invalid');
        senderTelText.textContent =
          'Invalid phone number format. Use format: +1234567890';
      } else {
        senderTel.classList.remove('invalid');
        senderTelText.textContent = '';
      }
      updateButtonSubmit();
    });
  }

  if (recipientAdress) {
    recipientAdress.addEventListener('input', () => {
      const adress = recipientAdress.value.trim();
      if (adress === '') {
        recipientAdress.classList.add('invalid');
        recipientAdressText.textContent = 'Please enter your adress';
      } else if (adress.length > 50) {
        recipientAdress.classList.add('invalid');
        recipientAdressText.textContent = 'More than 50 numbers';
      } else if (!validateAdress(adress)) {
        recipientAdress.classList.add('invalid');
        recipientAdressText.textContent =
          'Invalid adress format. Use format: ул.Название';
      } else {
        recipientAdress.classList.remove('invalid');
        recipientAdressText.textContent = '';
      }
      updateButtonSubmit();
    });
  }

  if (senderMail) {
    senderMail.addEventListener('input', () => {
      const email = senderMail.value.trim();
      if (email === '') {
        senderMail.classList.add('invalid');
        senderMailText.textContent = 'Please enter your email';
      } else if (!validateEmail(email)) {
        senderMail.classList.add('invalid');
        senderMailText.textContent = 'Invalid email format';
      } else {
        senderMail.classList.remove('invalid');
        senderMailText.textContent = '';
      }
      updateButtonSubmit();
    });
  }

  if (postCardText) {
    postCardText.addEventListener('input', () => {
      const text = postCardText.value.trim();
      if (text === '') {
        senderMail.classList.add('invalid');
        textPostCardText.textContent = 'Please enter your text';
      } else if (text.length > 70) {
        senderMail.classList.add('invalid');
        textPostCardText.textContent = 'More than 70 numbers';
      } else {
        senderMail.classList.remove('invalid');
        textPostCardText.textContent = '';
      }
      updateButtonSubmit();
    });
  }

  if (coupon) {
    coupon.addEventListener('input', () => {
      const text = coupon.value.trim();
      if (text === '') {
        senderMail.classList.add('invalid');
        couponText.textContent = 'Please enter your coupon';
      } else if (!validateCoupon(text)) {
        senderMail.classList.add('invalid');
        couponText.textContent = 'Invalid coupon format: not more 10 number';
      } else {
        senderMail.classList.remove('invalid');
        couponText.textContent = '';
      }
      updateButtonSubmit();
    });
  }

  if (certificate) {
    certificate.addEventListener('input', () => {
      const text = certificate.value.trim();
      if (text === '') {
        certificate.classList.add('invalid');
        certificateText.textContent = 'Please enter your certificate';
      } else if (text.length > 20) {
        certificate.classList.add('invalid');
        certificateText.textContent = 'More than 20 numbers';
      } else {
        certificate.classList.remove('invalid');
        certificateText.textContent = '';
      }
      updateButtonSubmit();
    });
  }
}
orderValidator();
