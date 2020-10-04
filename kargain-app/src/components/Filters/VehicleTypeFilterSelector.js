import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

const tabsRadio = [
    {
        value: 'car',
        label: 'Voiture',
        img: 'tab-car.png',
        imgSelected: 'tab-car-blue.png'
    },
    {
        value: 'moto',
        label: 'Moto',
        img: 'tab-moto.png',
        imgSelected: 'tab-moto-blue.png'
    },
    {
        value: 'utility',
        label: 'Utilitaire',
        img: 'tab-gruz.png',
        imgSelected: 'tab-gruz-blue.png'

    },
    {
        value: 'camper',
        label: 'Camping car',
        img: 'tab-camper.png',
        imgSelected: 'tab-camper-blue.png'
    }
];

const VehicleTypeFilterSelector = ({ handleSelectVehicleType, name, control, rules }) => {
    const [type, setType] = useState(null);

    const handleSelect = (index) => {
        const type = tabsRadio[index].value
        setType(type);
        handleSelectVehicleType(type);
    };

    return (
        <section>
            <Row className="justify-content-center">
                {tabsRadio && tabsRadio.map((tab, index) => {
                    return (
                        <Col key={index} xs={6} sm={4} lg={6}>
                            <div className="form-check no-input form-check-vehicle m-1">
                                <input id={`name_${index}`}
                                    ref={control.register(rules)}
                                    type="radio"
                                    name={name}
                                    value={tab.value}
                                    defaultChecked={tab.checked}
                                    onClick={() => handleSelect(index)}
                                />
                                <label className="p-2" htmlFor={`name_${index}`}>
                                    <img
                                        src={type === tab.value ? `/images/${tab.imgSelected}` : `/images/${tab.img}`}
                                        height="30"
                                        width="40"
                                        alt={tab.label}
                                        title={tab.label}
                                    />
                                </label>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </section>
    );
};

export default VehicleTypeFilterSelector;
