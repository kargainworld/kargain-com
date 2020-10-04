function SelectOptionsUtils (data) {
    return data.map(item => {
        if (typeof item === 'object') return { ...item }
        else {
            return {
                value: typeof item === 'string' ? item.split(' ').join('-').toLowerCase() : Number(item),
                label: item
            }
        }
    })
}

export { SelectOptionsUtils }
