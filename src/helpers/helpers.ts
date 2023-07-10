// interfaces
import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';

const formatCurrency = (amount: number) => {
  const formatToUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  return formatToUSD.format(amount);
}

const formatText = (text: string) => {
  let _text: string = '';
  
  if (text) {
    _text = text.split(' ').join('-').toLowerCase();
  }
  
  return _text;
}

const calculateAverageRating = (ratings: number[]) => {
  if (!ratings) return 0;

  let sum = 0;

  ratings.forEach(r => sum = sum + r);

  const average = sum / ratings.length;
  const result = +average.toFixed(1);

  return result;
}

const calculateSalePrice = (price: number, percent: number) => {
  const salePrice = price - (price*(percent/100));
  return salePrice;
}

const getMinPrice = (productPriceArr: I_ProductPriceTableRecord[]) => {
  const prices: number[] = productPriceArr.map((productPriceObj: I_ProductPriceTableRecord) => productPriceObj.price);
  return Math.min(...prices);
}

const getMaxPrice = (productPriceArr: I_ProductPriceTableRecord[]) => {
  const prices: number[] = productPriceArr.map((productPriceObj: I_ProductPriceTableRecord) => productPriceObj.price);
  return Math.max(...prices);
}

const groupBy = (data: any, key: any) => {
  return data.reduce(function(previousValue: any, currentValue: any) {
    (previousValue[currentValue[key]] = previousValue[currentValue[key]] || []).push(currentValue);
    return previousValue;
  }, {});
};

const generateClass = (unconditionalClasses: string[] = [], conditionalClasses: { [conditionalClass: string]: boolean }[] = []) => {
  if (unconditionalClasses.length === 0 && conditionalClasses.length === 0) return '';

  const passedConditionalClasses = [];

  for (const conditionalClass in conditionalClasses) {
    if (conditionalClasses[conditionalClass]) passedConditionalClasses.push(conditionalClass);
  }

  const allClasses = unconditionalClasses.concat(passedConditionalClasses);

  const generatedClass = allClasses.join(' ');

  return generatedClass;
}

const formatPackage = (quantity: number, showPer: boolean = false) => {
  let _quantity: string = '';

  // if (quantity === 1) {
  //   _quantity = showPer ? 'each' : '1';
  // } else if (quantity === 10) {
  //   _quantity = showPer ? 'per pack of 10' : '10';
  // } else if (quantity === 12) {
  //   _quantity = showPer ? 'per 1 dz.': '1 dz.';
  // } else if (quantity === 36) {
  //   _quantity = showPer ? 'per 3 dz.': '3 dz.';
  // } else if (quantity === 60) {
  //   _quantity = showPer ? 'per 5 dz.': '5 dz.';
  // }

  if (quantity === 1) {
    _quantity = showPer ? 'each' : '1';
  } else if (quantity === 10) {
    _quantity = showPer ? '/pack of 10' : '10';
  } else if (quantity === 12) {
    _quantity = showPer ? '/dz.': '1 dz.';
  } else if (quantity === 36) {
    _quantity = showPer ? '/3 dz.': '3 dz.';
  } else if (quantity === 60) {
    _quantity = showPer ? '/5 dz.': '5 dz.';
  }

  return _quantity;
}

const formatName = (name: string, color: string, size: number, sizeUnit: string) => {
  const _name = name.split(' ').join('-');
  const _color = color.split(' ').join('-');

  return `${_name}-${_color}-${size}-${sizeUnit}`;
}

export {
  calculateAverageRating,
  calculateSalePrice,
  formatCurrency,
  formatText,
  groupBy,
  getMinPrice,
  getMaxPrice,
  generateClass,
  formatPackage,
  formatName,
}