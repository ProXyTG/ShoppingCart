export default {
    formatCurrency: function (num) {
        return 'EUR ' + Number(num.toFixed(2)).toLocaleString() + ' ';
    }
}
