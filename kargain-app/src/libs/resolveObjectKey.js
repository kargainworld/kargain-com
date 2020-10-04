const resolveObjectKey = (obj, str) => {
    if(!str) return obj
    if (typeof obj === 'object') {
        str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        str = str.replace(/^\./, '');           // strip a leading dot
        const a = str.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
            const k = a[i];
            if (typeof obj !== 'object') return obj;
            if (k in obj) obj = obj[k];
            else return;
        }
    }
    return obj;
};

export default resolveObjectKey
