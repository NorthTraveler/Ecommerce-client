const displayCurrency = (num) =>{
    const formatter = new Intl.NumberFormat("zh-CN",{
        style:"currency",
        currency:"CNY",
        minimumIntegerDigits:2
    })
    return formatter.format(num)
}
export default displayCurrency