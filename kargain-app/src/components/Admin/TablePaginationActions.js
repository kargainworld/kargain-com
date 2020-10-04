import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5)
    }
}));

function TablePaginationActions({ count, page, rowsPerPage, onChangePage }) {
    const classes = useStyles();

    const handleFirstPageButtonClick = () => {
        onChangePage(0);
    };

    const handleBackButtonClick = () => {
        onChangePage(page - 1);
    };

    const handleNextButtonClick = () => {
        onChangePage(page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                <KeyboardArrowLeft />
            </IconButton>

            <Button size="medium">
                <span> {rowsPerPage*page} - {rowsPerPage*(page + 1)} </span>
            </Button>

            <IconButton onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page">
                <KeyboardArrowRight/>
            </IconButton>

            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>

            <Button size="medium" aria-label="next page">
                <span>{count}</span>
            </Button>

        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
};

TablePaginationActions.defaultProps =  {
    page : 0,
    rowsPerPage : 50
}

export default TablePaginationActions
