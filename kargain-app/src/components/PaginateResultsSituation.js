import React, { memo } from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'

const PaginateResultsSituation = ({page, count, size}) => {
    const { t } = useTranslation()
    if (page > 1) count += page * size

    return (
        count ? <p className="py-2 text-center">
            {t('vehicles:{page}-announces-of-{pages}', { page, pages : count })}
        </p> : null
    )
}

export default memo(PaginateResultsSituation)

PaginateResultsSituation.propsType = {
    count : PropTypes.number.isRequired,
    page : PropTypes.number.isRequired
}
