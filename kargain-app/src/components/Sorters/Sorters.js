import React, { useState } from 'react';
import NiceSelect from 'react-select';
import useTranslation from 'next-translate/useTranslation';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const Sorters = ({ updateSorter }) => {
    const { t } = useTranslation();
    const options = [
        {
            label: t('vehicles:most-recent'),
            icon: ArrowUpwardIcon,
            value: {
                key: 'DATE',
                asc: false
            }
        },
        {
            label: t('vehicles:less-recent'),
            icon: ArrowDownwardIcon,
            value: {
                key: 'DATE',
                asc: true
            }
        },
        {
            label: t('vehicles:most-recent'),
            icon: ArrowUpwardIcon,
            value: {
                key: 'PRICE',
                asc: false
            }
        },
        {
            label: t('vehicles:less-recent'),
            icon: ArrowDownwardIcon,
            value: {
                key: 'PRICE',
                asc: true
            }
        },
        {
            label: t('vehicles:most-mileage'),
            icon: ArrowUpwardIcon,
            value: {
                key: 'MILEAGE',
                asc: false
            }
        },
        {
            label: t('vehicles:less-mileage'),
            icon: ArrowDownwardIcon,
            value: {
                key: 'MILEAGE',
                asc: true
            }
        },
        {
            label: t('vehicles:closest'),
            icon: ArrowUpwardIcon,
            value: {
                key: 'RADIUS',
                asc: true
            }
        },
        {
            label: t('vehicles:farthest'),
            icon: ArrowDownwardIcon,
            value: {
                key: 'RADIUS',
                asc: false
            }
        }
    ];
    const [sorter, setSorter] = useState(options[0]);

    const onHandleChange = (sort) => {
        setSorter(sort);
        updateSorter(sort.value);
    };

    const customSingleValue = ({ data }) => (
        <div className="input-select">
            <div className="input-select__single-value">
                <span>{data.label}</span>
            </div>
        </div>
    );

    return (
        <section style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
        }}>
            <span>{t('vehicles:sort-by')}:</span>
            <div className="sorter">
                <NiceSelect
                    name="sort"
                    value={sorter}
                    autosize={true}
                    onChange={onHandleChange}
                    components={{ SingleValue: customSingleValue }}
                    classNames='w-100'
                    options={options}
                />
            </div>
        </section>
    );
};

export default Sorters;
