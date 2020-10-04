import React from 'react';
import BulletPoint from '../BulletPoint';

const BooleanBullet = ({ bool, onClick }) => {
    const color = bool ? 'green' : 'red';
    return <BulletPoint color={color} onClick={onClick}/>;
};

export default BooleanBullet;
