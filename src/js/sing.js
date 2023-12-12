import JustValidate, { Rules } from 'just-validate';

class Sing{
    constructor(){
        this.form = document.querySelector('form');
        this.login = document.querySelector('.sing__login');
        this.password = document.querySelector('.sing__password');
        this.btn = document.querySelector('.sing__btn');
        this.validate = new JustValidate(this.form);
        this.validation();
    }
    validation(){
        //Логин         
        const ruleLogin = [
            {
                rule: 'required',
                errorMessage: 'Введите логин'
            },
            {
                rule: 'customRegexp',
                value: /(^[a-zA-Z0-9][a-zA-Z0-9.-]{1,20}[a-zA-Z0-9]@[a-zA-Zа-яА-Я0-9][a-zA-Zа-яА-Я0-9.-]{1,15}[a-zA-Zа-яА-Я0-9]\.[a-z]{1,10})/,
                errorMessage: 'Невалидный email',
            },
        ];
        const settingLogin = {
            errorsContainer: '.label__login',
            errorLabelCssClass: ['invalid'],
            errorFieldCssClass: ['error-focus'],
        }
        this.validate.addField(this.login, ruleLogin, settingLogin);
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

    }
}

const sing = new Sing();