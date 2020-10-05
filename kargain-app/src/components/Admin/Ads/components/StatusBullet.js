import React, { useContext, useState } from 'react'
import { MessageContext } from '../../../../context/MessageContext'
import AnnounceService from '../../../../services/AnnounceService'
import NiceSelect, { components } from 'react-select'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import BulletPoint from '../../../BulletPoint'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(() => ({
    editSelectPop: {
        position: 'absolute',
        width: '300px',
        padding: '1rem',
        border: '1px solid gainsboro',
        backgroundColor: 'antiquewhite'
    }
}))

const { Option } = components
const CustomSelectOption = (props) => {
    return (
        <Option {...props} className="d-flex align-items-center">
            {props.data.icon && props.data.icon}
            {props.data.label}
        </Option>
    )
}

const CustomSelectValue = (props) => (
    <div className="d-flex align-items-center">
        {props.data.icon && props.data.icon}
        {props.data.label}
    </div>
)

const StatusBullet = ({ slug, status: statusProps }) => {
    const classes = useStyles()
    const [status, setStatus] = useState(statusProps)
    const [clicked, setClicked] = useState(false)
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const [selectedOption, setSelectedOption] = useState(null)
    const options = [
        {
            value: 'rejected',
            label: 'Reject',
            tooltipHelper: 'Rejected',
            color: 'red'
        },
        {
            value: 'deleted',
            label: 'Delete',
            tooltipHelper: 'Deleted',
            color: 'black'
        },
        {
            value: 'archived',
            label: 'Archive',
            tooltipHelper: 'Archived',
            color: 'orange'
        },
        {
            value: 'active',
            label: 'Active',
            tooltipHelper: 'Active',
            color: 'blue'
        },
        {
            value: 'paid',
            label: 'Close',
            tooltipHelper: 'Payé',
            color: 'green'
        }
    ]

    const params = options.find(option => option.value === status)

    const optionsGood = options
        .filter(option => option.value !== status)
        .map(option => ({
            ...option,
            icon: <BulletPoint color={option.color}/>
        }))

    const handleUpdate = async () => {
        try {
            await AnnounceService.updateAdminAnnounce(slug, {
                status: selectedOption
            })
            setStatus(status => !status)
            dispatchModal({ msg: 'updated' })
        } catch (err) {
            dispatchModalError({ err })
        }
    }

    return (
        <div className="edit">
            {clicked ? (
                <div className={classes.editSelectPop}>
                    <NiceSelect
                        components={{
                            Option: CustomSelectOption,
                            SingleValue: CustomSelectValue
                        }}
                        defaultValue={options.find(option => option.value === status)}
                        onChange={(option) => setSelectedOption(option.value)}
                        options={optionsGood}
                    />
                    <Button
                        startIcon={<CloseIcon/>}
                        onClick={() => {
                            setSelectedOption(null)
                            setClicked(false)
                        }}
                    />
                    <Button
                        startIcon={<SaveIcon/>}
                        onClick={async () => {
                            setClicked(false)
                            await handleUpdate()
                        }}
                    />
                </div>
            ) : (
                <BulletPoint
                    {...params}
                    onClick={() => {
                        setClicked(true)
                    }}
                />
            )}
        </div>
    )
}

export default StatusBullet
