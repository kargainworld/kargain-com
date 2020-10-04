import React, { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import NiceSelect from 'react-select';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import useTranslation from 'next-translate/useTranslation'

const DamagesNav = ({ activeTab, setActiveTab, damagesTabs }) => {
    const theme = useTheme();
    const { t } = useTranslation()
    const isUpTablet = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    });

    return (
        <div className="annoNav">
            {isUpTablet ? (
                <ul className="nav nav-tabs">
                    {damagesTabs.map((tab, indexTab) => {
                        return (
                            <li key={indexTab} className={clsx('nav-item')}>
                                <a className={clsx('nav-link', activeTab === indexTab && 'active')}
                                    onClick={() => {
                                        setActiveTab(indexTab);
                                    }}>
                                    {t(`vehicles:${tab.key}`)}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <NiceSelect
                    options={damagesTabs.map((tab, index) => ({
                        value: index,
                        label: `${t(`vehicles:${tab.key}`)} (${tab.countStages})`
                    }))}
                    onChange={({ value }) => {
                        setActiveTab(value);
                    }}

                />
            )}
        </div>
    );
};

DamagesNav.propTypes = {
    activeTab: PropTypes.number.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    damagesTabs: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        countStages: PropTypes.number
    }))
};

DamagesNav.defaultProps = {
    activeTab : 0,
    damagesTabs : []
}
export default memo(DamagesNav);

