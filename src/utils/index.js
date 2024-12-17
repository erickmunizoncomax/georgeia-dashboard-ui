export const getPivotChartArray = (data = [], row, column, value, addRow, financialYear) => {

    var item = data.reduce((a, b) => {
        a[b[row]] = a[b[row]] || [];
        var obj = {};
        obj[addRow] = b[addRow] ? b[addRow] : 0;
        addRow
            ? a[b[row]].push({ ...obj, ...{ [b[column]]: (b[value]) } })
            : a[b[row]].push({ ...{ [b[column]]: (b[value]) } });
        return a;
    }, {});


    var array = Object.keys(item).map(function (k) {
        return { [row]: k, ...Object.assign.apply({}, item[k]) };
    });
    return array.sort();
};

export function toMillion(value) {
    if (value < 0) {

        return Math.abs(Number(value)) >= 1.0e9
            ? "$" + -(Math.abs(Number(value)) / 1.0e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
                ? "$" + -(Math.abs(Number(value)) / 1.0e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M"
                : // Three Zeroes for Thousands
                Math.abs(Number(value)) >= 1.0e3
                    ? "$" + -(Math.abs(Number(value)) / 1.0e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M"
                    : "$" + -(Math.abs(Number(value)) / 1.0e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M";
    } else {
        return Math.abs(Number(value)) >= 1.0e9
            ? "$" + (Math.abs(Number(value)) / 1.0e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
                ? "$" + (Math.abs(Number(value)) / 1.0e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M"
                : // Three Zeroes for Thousands
                Math.abs(Number(value)) >= 1.0e3
                    ? "$" + (Math.abs(Number(value)) / 1.0e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M"
                    : "$" + (Math.abs(Number(value)) / 1.0e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M";
    }
} 

