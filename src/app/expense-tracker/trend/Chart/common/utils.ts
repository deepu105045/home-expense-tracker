/* eslint-disable prefer-arrow/prefer-arrow-functions */
export class Utils {


  static sortObject(values: any) {
    // return Object.keys(values)
    //   .sort()
    //   .reduce(function(acc, key) {
    //     acc[key] = values[key];
    //     return acc;
    //   }, {});

    const orderedDates = {};
    Object.keys(values).sort(function(a, b) {
      return a.split('/').reverse().join('').localeCompare(b.split('/').reverse().join(''));
    }).forEach(function(key) {
      orderedDates[key] = values[key];
    });
    return orderedDates;
  }



  padToString = (num) => String('0' + num).slice(-2);
}
