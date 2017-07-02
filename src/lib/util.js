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
    switch(type) {
      case 'yy-mm-dd':
        return `${date.getFullYear()}-${this.dateCover(date.getMonth() + 1)}-${this.dateCover(date.getDate())}`;
      case 'chinese':
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      default:
        return `${date.getFullYear()}-${this.dateCover(date.getMonth() + 1)}-${this.dateCover(date.getDate())}`;
    }
  },

}
