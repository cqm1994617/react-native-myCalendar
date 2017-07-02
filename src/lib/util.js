export default {
  getPreMonthDate(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  },
  getNextMonthDate(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  },
  dateCover(num) {
    return num < 10 ? `0${num}` : num;
  },
  dateFormat(date, type) {
    switch (type) {
      case 'yy-mm-dd':
        return `${date.getFullYear()}-${this.dateCover(date.getMonth() + 1)}-${this.dateCover(date.getDate())}`;
      case 'chinese':
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      default:
        return `${date.getFullYear()}-${this.dateCover(date.getMonth() + 1)}-${this.dateCover(date.getDate())}`;
    }
  },
  getFirstDateInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  },
  getDateNumber(date) {
    const year = date.getFullYear();
    return [31,
      (year % 100 === 0 && year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0) ? 29 : 28,
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
  },
  getDateArr(date) {
    const dateNumber = this.getDateNumber(date);
    const dateArr = [];
    console.log(dateNumber)
    for (let i = 0; i < dateNumber; i++) {
      dateArr.push(new Date(date.getFullYear(), date.getMonth(), i + 1));
    }
    return dateArr;
  }
}
