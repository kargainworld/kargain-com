import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { Alert, Col, Row, TabContent, TabPane } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import DamagesNavResponsive from './DamagesNavResponsive';
import Header from '../Header';

const useStyles = makeStyles(() => ({
    annoPickerContainer: {
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
        position: 'relative',
        maxWidth: '500px',
        cursor: 'crosshair'
    },

    annoStage: {
        position: 'relative',
        width: '100%',
        marginTop: '1rem'
    },

    annoImg: {
        objectFit: 'contain',
        width: '100%',
        border: '1px solid'
    },

    annoInputs: {
        backgroundColor: '#e9ecef',
        border: '1px solid gainsboro',
        textAlign: 'center',
        marginTop: '2rem',
        overflowX: 'auto'
    },

    annoInput: {
        display: 'flex',
        justifyContent: 'left',
        alignContent: 'center',
        margin: '.6rem .4rem'
    },

    annoFloatingNumber: {
        position: 'absolute',
        cursor: 'default',
        marginLeft: '-.5rem',
        marginTop: '-.5rem'
    },

    annoNumber: {
        backgroundColor: '#dc3545',
        color: '#fff',
        fontSize: '.8rem',
        lineHeight: '1.4rem',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '50%',
        width: '1.4rem',
        height: '1.4rem',
        display: 'inline-block'
    }
}));

const DamageSelectorTabs = ({ tabs, defaultMaxDamages, fireChanges, selectorFullWidth, ...props }) => {
    let annoRefs = [];
    const classes = useStyles();
    const { t } = useTranslation();
    const warningDamageRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [damagesTabs, setDamagesTabs] = useState([]);

    useEffect(() => {
        setDamagesTabs(tabs);
    }, [tabs]);

    useEffect(() => {
        fireChanges(damagesTabs);
    }, [damagesTabs]);

    const getClick = (e, indexTab) => {
        const annoRef = annoRefs[indexTab];
        const max = tabs[activeTab].maxDamages || defaultMaxDamages;

        if (damagesTabs[indexTab].stages.length >= max) {
            // scrollToRef(warningDamageRef);
            return;
        }

        const x = e.nativeEvent.offsetX / annoRef.offsetWidth;
        const y = e.nativeEvent.offsetY / annoRef.offsetHeight;

        const stage = {
            position: {
                left: `${x * 100}%`,
                top: `${y * 100}%`
            }
        };

        setDamagesTabs(damagesTabs =>
            damagesTabs.map((item, i) => {
                if (i === indexTab) {
                    return {
                        ...item,
                        stages: [...item.stages, stage]
                    };
                } else {
                    return item;
                }
            }));
    };

    const rmStage = (indexTab, indexStage) => {
        setDamagesTabs(damagesTabs =>
            damagesTabs.map((item, i) => {
                if (i === indexTab) {
                    return {
                        ...item,
                        stages: item.stages.slice(0, indexStage)
                            .concat(item.stages.slice(indexStage + 1, item.stages.length))
                    };
                } else {
                    return item;
                }
            })
        );
    };

    const onInputStageChange = (indexTab, stageIndex, value) => {
        setDamagesTabs(damagesTabs =>
            damagesTabs.map((item, i) => {
                if (i === indexTab) {
                    return {
                        ...item,
                        stages: item.stages.map((stage, ii) => {
                            if (ii === stageIndex) {
                                return {
                                    ...stage,
                                    text: value
                                };
                            } else {
                                return stage;
                            }
                        })
                    };
                } else {
                    return item;
                }
            })
        );
    };

    return (
        <section className="anno">
            <DamagesNavResponsive
                {...{activeTab,
                    setActiveTab,
                    damagesTabs: damagesTabs
                        .filter(tab => tab.display)
                        .map(tab => ({
                            key: tab.key,
                            countStages: tab.stages?.length
                        }
                    )),
                }}
            />

            <TabContent ref={warningDamageRef} activeTab={activeTab}>
                {damagesTabs
                    .filter(tab => tab.display)
                    .map((damageTab, indexTab) => {
                    if (!damageTab.stages) damageTab.stages = [];
                    const stages = damageTab.stages;
                    const max = damageTab.maxDamages || defaultMaxDamages;
                    const col = selectorFullWidth ? 12 : 6;

                    return (
                        <TabPane key={indexTab} tabId={indexTab}>
                            <Row>
                                <Col sm={12} md={col} lg={6}>
                                    <DamagesPicker {...{
                                        annoRefs,
                                        indexTab,
                                        damageTab,
                                        getClick
                                    }}/>
                                </Col>
                                <Col sm={12} md={col} lg={6}>
                                    <div className={clsx(classes.annoInputs)}>
                                        <Header h3> {t('vehicles:damages')} :</Header>
                                        {stages.length === 0 && <Header p> {t('vehicles:click-image')}</Header>}
                                        {stages.length >= max && <Alert color="warning">Max {max} damages</Alert>}
                                        {stages.map((stage, indexStage) => {
                                            return (
                                                <div key={indexStage} className={classes.annoInput}>
                                                    <div style={{ flex: 1 }}>
                                                        <IconButton
                                                            aria-label="delete"
                                                            className={classes.margin}
                                                            tabIndex="-1"
                                                            onClick={() => rmStage(indexTab, indexStage)}>
                                                            <DeleteIcon fontSize="small"/>
                                                        </IconButton>
                                                        <span
                                                            className={clsx(classes.annoNumber)}>{indexStage + 1}</span>
                                                    </div>
                                                    <div style={{
                                                        margin: 'auto',
                                                        flex: 3
                                                    }}>
                                                        <input type="text"
                                                            value={stage.text || ''}
                                                            onChange={(e) => onInputStageChange(indexTab, indexStage, e.target.value)}
                                                            className={clsx('form-control form-control-sm')}
                                                            name={`annotation_${indexStage + 1}`}
                                                            placeholder={t('vehicles:damages-{number}-description',{ number : indexStage + 1})}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    );
                })}
            </TabContent>

            {props.enableDebug && (
                <pre>{JSON.stringify(damagesTabs, null, 2)}</pre>
            )}

        </section>
    );
};

const DamagesPicker = ({ annoRefs, indexTab, damageTab, getClick }) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.annoPickerContainer)}>
            <div className={clsx(classes.annoStage)}
                id={`anno_${indexTab}`}
                ref={annoRef => annoRefs[indexTab] = annoRef}
                onClick={(e) => getClick(e, indexTab)}
            >
                <img className={clsx(classes.annoImg)} src={damageTab.img} alt={damageTab.title}/>

                {damageTab.stages && damageTab.stages.map((stage, indexStage) => (
                    <span key={indexStage}
                        style={{ ...stage.position }}
                        className={clsx(classes.annoFloatingNumber, classes.annoNumber)}>
                        {indexStage + 1}
                    </span>
                ))}
            </div>
        </div>
    );
};

DamageSelectorTabs.propTypes = {
    defaultMaxDamages: PropTypes.number,
    selectorFullWidth: PropTypes.bool,
    enableDebug: PropTypes.bool,
    fireChanges: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        key: PropTypes.string,
        stages: PropTypes.array,
        maxDamages: PropTypes.number
    })).isRequired
};

DamageSelectorTabs.defaultProps = {
    defaultMaxDamages: 10,
    enableDebug: false
};
export default DamageSelectorTabs;
