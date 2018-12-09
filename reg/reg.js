var reg = /Byron|Casper/g;
var str = 'ByronCasper'
var result = str.replace(reg, 'X')
var ra = str.match(reg)
console.log(result)
