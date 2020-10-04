import React, { useState } from 'react';
import PropTypes from 'prop-types'
import clsx from 'clsx';

const TabsItem = ({ activeTab, index, ...props }) => {
    return (
        <div id={props.id} className={clsx('tab-pane', 'fade',
            { show: index === activeTab },
            { active: index === activeTab },
            props.className)}>
            {props.children}
        </div>
    );
};

const Tabs = ({ defaultActive, children, id, handleClickTab}) => {
    const [activeTab, setActiveTab] = useState(defaultActive || 0);
    const tabs = !Array.isArray(children) ? [children] : children;

    const onClickTabItem = (index) => {
        setActiveTab(index);
        handleClickTab(index)
    };

    return (
        <section className="tabs">
            <ul className="nav nav-tabs m-2 justify-content-center" id={id}>
                {tabs && tabs.map((item, index) => {
                    if (!item) return null;
                    const { title, img : ImgComponent, className } = item.props;

                    return (
                        <li key={index}
                            className={clsx('nav-link', className, { active: index === activeTab })}
                            data-toggle="tab"
                            role="tab"
                            aria-selected={activeTab === index}
                            onClick={() => onClickTabItem(index)}>
                            {title && <label>{title}</label> }
                            {ImgComponent && ImgComponent }
                        </li>
                    );
                })}
            </ul>

            <div className="tab-content">
                {tabs && tabs.map((item, index) => {
                    return <TabsItem
                        key={index}
                        index={index}
                        activeTab={activeTab}
                        {...item.props}
                    />;
                })}
            </div>
        </section>
    );
};

Tabs.Item = TabsItem;

Tabs.propTypes = {
    defaultActiveIndex : PropTypes.number,
    handleClickTab : PropTypes.func
}

Tabs.defaultProps = {
    defaultActiveIndex : 0,
    handleClickTab : () => {}
}

export default Tabs;
