import JustValidate, { Rules } from 'just-validate';

class Registration{
    constructor(){
        this.form = document.querySelector('form');
        this.name = document.querySelector('.registration__name');
        this.email = document.querySelector('.registration__email');
        this.password = document.querySelector('.registration__password');
        this.checkPassword = document.querySelector('.registration__check-password');
        this.btn = document.querySelector('.registration__btn');
        this.validate = new JustValidate(this.form);
        this.validation();
    }
    validation(){
        //Имя      
        const ruleName = [
            {
                rule: 'required',
                errorMessage: 'Введите имя'
            },
            {
                rule: 'customRegexp',
                value: /^[a-zA-Zа-яА-Я\s]{3,20}$/,
                errorMessage: 'Только буквы',
            },
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Минимум 3 буквы',
            },
            {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Максимум 20 букв',
            },
            {
                rule: 'customRegexp',
                value: /^(?:(.)(?!\1\1))+$/,
                errorMessage: 'Три одинаковых буквы подряд',
            },
        ];
        const settingName = {
            errorsContainer: '.label__name',
            errorLabelCssClass: ['invalid'],
            errorFieldCssClass: ['error-focus'],
        }
        this.validate.addField(this.name, ruleName, settingName);
        //Логин         
        const ruleLogin = [
            {
                rule: 'required',
                errorMessage: 'Введите email'
            },
            {
                rule: 'customRegexp',
                value: /(^[a-zA-Z0-9][a-zA-Z0-9.-]{1,20}[a-zA-Z0-9]@[a-zA-Zа-яА-Я0-9][a-zA-Zа-яА-Я0-9.-]{1,15}[a-zA-Zа-яА-Я0-9]\.[a-z]{1,10})/,
                errorMessage: 'Невалидный email',
            },
        ];
        const settingLogin = {
            errorsContainer: '.label__email',
            errorLabelCssClass: ['invalid'],
            errorFieldCssClass: ['error-focus'],
        }
        this.validate.addField(this.email, ruleLogin, settingLogin);
        //Пароль
        const rulePassword = [
            {
                rule: 'required',
                errorMessage: 'Введите пароль',
            },
            {
                rule: 'minLength',
                value: 8,
                errorMessage: 'Минимум 8 символов',
            },
            {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Максимум 20 символов',
            },
            {
                rule: 'customRegexp',
                value: /^(?:(.)(?!\1\1))+$/,
                errorMessage: 'Максиуму 2 одинаковых символа подряд',
            },
            {
                rule: 'password',
                errorMessage: 'Можно только (a-z,A-Z,0-9,- и .)',
            },
        ];
        const settingPassword = {
            errorsContainer: '.label__password',
            errorLabelCssClass: ['invalid'],
            errorFieldCssClass: ['error-focus'],
        }
        this.validate.addField(this.password, rulePassword,settingPassword);
        //Второй ввод пароля
        const ruleCheckPassword = [
            {
                rule: 'required',
                errorMessage: 'Введите повторно пароль',
            },
            {
                rule: 'minLength',
                value: 8,
                errorMessage: 'Минимум 8 символов',
            },
            {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Максимум 20 символов',
            },
            {
                rule: 'customRegexp',
                value: /^(?:(.)(?!\1\1))+$/,
                errorMessage: 'Максиуму 2 одинаковых символа подряд',
            },
            {
                rule: 'password',
                errorMessage: 'Можно только (a-z,A-Z,0-9,- и .)',
            },
        ];
        const settingCheckPassword = {
            errorsContainer: '.label__check-password',
            errorLabelCssClass: ['invalid'],
            errorFieldCssClass: ['error-focus'],
        }
        this.validate.addField(this.checkPassword, ruleCheckPassword,settingCheckPassword);
    }
}

const registration = new Registration();