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
                errorMessage: '1'
            },
            {
                rule: 'email',
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
                rule: 'password',
                errorMessage: 'Пароль не валидный (допустимо: буквы A-Z, цыфры 0-9,и точка ".")',
            },
        ];
        const settingPassword = {
            errorsContainer: '.label__password',
            errorLabelCssClass: ['invalid'],
            errorFieldCssClass: ['error-focus'],
            tooltip: {
                position: 'top',
            },
        }
        this.validate.addField(this.password, rulePassword,settingPassword);

    }
}

const sing = new Sing();