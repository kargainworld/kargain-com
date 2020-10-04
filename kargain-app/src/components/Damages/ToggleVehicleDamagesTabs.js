const getValues = (vehicleType) => {
    switch (vehicleType) {
    case 'car':
        return [
            'outside-view',
            'inside-view',
            'mecanic'
            //'front-face',
            // 'rear-face',
            // 'left-side',
            // 'right-side',
        ]
    case 'moto' :
        return []
    }
}

const toggleVehicleDamagesTabs = (vehicleType = "car", tabs) => {
    const values = getValues(vehicleType);
    if(!values || !Array.isArray(tabs)) return []
    
    return tabs.map(tab => (values.includes(tab['key'])) ?
        {
            ...tab,
            display : true
        }: {
            ...tab,
            display : false
        })
};

export default toggleVehicleDamagesTabs
