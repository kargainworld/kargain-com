const emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*[\w])(?=.*[0-9])[\w\W]{8,}$/

export default {

    checkIsTrue (expression) {
        return expression
    },

    checkIsFilled (x) {
        return x != null && x !== ''
    },

    parseLength (expression, length) {
        return expression.substring(0, length)
    },

    parseOnlyLetterAndSpace (expression) {
        return expression.replace(/[^A-Za-z ]/g, '')
    },

    checkLengthMin (expression, length) {
        return expression && expression.trim().length >= length
    },

    checkLengthMax (expression, length) {
        return expression && expression.trim().length <= length
    },

    checkIsEmail (x) {
        return Boolean(x.match(emailPattern))
    },

    checkIsValidPassword (x) {
        return Boolean(x.match(passwordRegex))
    },

    checkIsNumber (x) {
        return !isNaN(Number(x))
    }
}
