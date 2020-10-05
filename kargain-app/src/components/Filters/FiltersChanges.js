import React from 'react'
import Button from '@material-ui/core/Button'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import useTranslation from 'next-translate/useTranslation'
import makeStyles from '@material-ui/core/styles/makeStyles'
import resolveObjectKey from '../../libs/resolveObjectKey'

const fieldOptions = {
    'manufacturer.make' : {
        key : 'label'
    },
    vehicleType : {
        key : 'value'
    },
    adType : {
        key : 'value'
    },
    mileage : {
        suffix : 'km'
    },
    powerKw : {
        suffix : 'kw'
    },
    radius : {
        suffix : 'km'
    },
    consumptionGkm : {
        suffix : "g/km"
    },
    price: {
        suffix : "€"
    }
}

const useStyles = makeStyles(() => ({
    button: {
        width : '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

const FiltersChanges = ({changes = {}, resetValue}) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const fieldsToHide = ["coordinates"]
    const filtered = Object.keys(fieldOptions).reduce((carry, key)=> {
        if(fieldsToHide[key]) return carry
        const match = resolveObjectKey(changes, key)
        if(match) return {...carry, [key] : match }
        return carry
    },{})

    return(
        <div className="changes">
            {Object.keys(filtered).length !== 0 && (
                <ul className="list-style-none">
                    {Object.keys(filtered).map((key, index) => {
                        const filter = filtered[key]
                        const options = fieldOptions[name]
                        let val

                        if(Array.isArray(filter)) {
                            val = filter
                                .filter(v => typeof v !== "object")
                                .map(v => options?.suffix ? `${v}${options?.suffix}` : v)
                                .join(' - ')
                        }

                        else if(typeof filter === "object"){
                            val = options?.suffix ? `${filter?.label} ${options?.suffix}` : filter?.label
                        }

                        else val = options?.suffix ? `${filter} ${options?.suffix}` : filter

                        if(options?.hideValue || !val) return null

                        return (
                            <li key={index} className="my-1">
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                    endIcon={<HighlightOffIcon/>}
                                    onClick={() => resetValue(key)}
                                >
                                    <span className="text-left"> {t(`filters:${key}`)} : {val} </span>
                                </Button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default FiltersChanges
