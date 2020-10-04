import React, { forwardRef} from 'react';
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';

const TableMUI = ({ columns, data, title, ...props }) => {
    const MaterialTable = dynamic(() => import("material-table"), { ssr: false });

    return (
        <MaterialTable
            style={{
                margin: '5px',
                marginBottom: '10rem'
            }}
            localization={{
                pagination: {
                    labelRowsSelect: 'lignes',
                    labelDisplayedRows: '{from}-{to} de {count}'
                },
                toolbar: {
                    searchPlaceholder: 'Rechercher',
                    nRowsSelected: '{0} ligne(s) selectionnée(s)'
                },
                header: {
                    actions: 'Actions'
                },
                body: {
                    emptyDataSourceMessage: 'Aucune donnée à afficher',
                    filterRow: {
                        filterTooltip: 'Filtres'
                    }
                }
            }}
            icons={{
                // eslint-disable-next-line react/display-name
                Filter: forwardRef((props, ref) => <FilterList ref={ref}/>),
                // eslint-disable-next-line react/display-name
                Search: forwardRef((props, ref) => <SearchIcon ref={ref}/>)
            }}
            isLoading={props.loading}
            title={title}
            columns={columns}
            data={data}
            actions={props.actions}
            detailPanel={props.detailPanel}
            options={{
                search: props.search,
                // selection: props.selection,
                filtering: props.filtering,
                grouping: props.grouping,
                pageSize: props.tableLength,
                pageSizeOptions: [10, 20, 50, 100],
                exportButton: props.exportButton,
                exportFileName: props.exportFileName
                // actionsColumnIndex: -1
            }}
        />
    );
};

TableMUI.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    search: PropTypes.bool,
    filtering: PropTypes.bool,
    grouping: PropTypes.bool,
    exportButton: PropTypes.bool,
    tableLength: PropTypes.number
};

TableMUI.defaultProps = {
    search: true,
    selection: true,
    filtering: true,
    grouping: true,
    exportButton: true,
    tableLength: 15,
    exportFileName: 'export_data_sci'
};

export default TableMUI;
