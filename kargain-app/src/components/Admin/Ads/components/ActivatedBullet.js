import React, { useContext,  useState } from 'react'
import { MessageContext } from '../../../../context/MessageContext'
import AnnounceService from '../../../../services/AnnounceService'
import NiceSelect, { components } from 'react-select'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import BulletPoint from '../../../BulletPoint'
import makeStyles from '@material-ui/core/styles/makeStyles'
import BooleanBullet from '../../BooleanBullet'
import AnnounceModel from '../../../../models/announce.model'

const useStyles = makeStyles((theme) => ({
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

const ActivatedBullet = ({ slug, activated: activatedProps }) => {
    const classes = useStyles()
    const [activated, setActivated] = useState(activatedProps)
    const [clicked, setClicked] = useState(false)
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const [selectedOption, setSelectedOption] = useState(null)
    const options = [
        {
            label: 'Enable',
            value: true,
            color: 'green'
        },
        {
            label: 'Disable',
            value: false,
            color: 'red'
        }
    ].map(option => ({
        ...option,
        icon: <BulletPoint color={option.color}/>
    }))

    const handleUpdate = async () => {
        try {
            const announceRawUpdated = await AnnounceService.updateAdminAnnounce(slug, {
                activated: selectedOption
            })
    
            const announce = new AnnounceModel(announceRawUpdated)
            setActivated(activated => !activated)
            dispatchModal({ msg: `updated. Mail sent to ${announce.getAuthor.getEmail}` })
        } catch (err) {
            dispatchModalError({ err })
        }
    }

    return (
        <div className="edit">
            {clicked ? (
                <div className={classes.editSelectPop}>
                    <NiceSelect
                        defaultValue={options.find(option => option.value === activated)}
                        onChange={(option) => setSelectedOption(option.value)}
                        options={options}
                        components={{
                            Option: CustomSelectOption,
                            SingleValue: CustomSelectValue
                        }}
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
                <BooleanBullet
                    bool={activated}
                    onClick={() => {
                        setClicked(true)
                    }}/>
            )}
        </div>
    )
}

export default ActivatedBullet
