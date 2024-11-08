import * as React from 'react';
import BookIcon from '@mui/icons-material/Book';
import { Chip, useMediaQuery } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import {
    BulkDeleteButton,
    BulkExportButton,
    CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    List,
    InfiniteList,
    SearchInput,
    SimpleList,
    TextInput,
    TopToolbar,
    useTranslate,
    usePermissions,
    useGetIdentity
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Identifier, RaRecord } from 'ra-core';


export const PostIcon = BookIcon;

const QuickFilter = ({
    label,
}: {
    label: string;
    source?: string;
    defaultValue?: any;
}) => {
    const translate = useTranslate();
    return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};

const postFilter = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="title" defaultValue="Qui tempore rerum et voluptates" />,
    <QuickFilter
        label="resources.posts.fields.commentable"
        source="commentable"
        defaultValue
    />,
// ];

// const exporter = posts => {
//     const data = posts.map(post => ({
//         ...post,
//         backlinks: lodashGet(post, 'backlinks', []).map(
//             backlink => backlink.url
//         ),
//     }));
//     return jsonExport(data, (err, csv) => downloadCSV(csv, 'posts'));
// };

];

const exporter = (data: any) => console.log(data);

const mobileListPageActions = (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const MobileListPage: React.FC<{ filters: { [key: string]: string | number } }> = ({ filters = {} }) => {
    return (
        <InfiniteList
            filters={postFilter}
            sort={{ field: 'published_at', order: 'DESC' }}
            exporter={exporter}
            actions={mobileListPageActions}
            filter={filters}
        >
            <SimpleList
                primaryText={record => record.title}
                secondaryText={record => `${record.views} views`}
                tertiaryText={record =>
                    new Date(record.published_at).toLocaleDateString()
                }
            />
        </InfiniteList>
    )
};

const StyledDatagrid = styled(DatagridConfigurable)(({ theme }) => ({
    '& .title': {
        maxWidth: '16em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    '& .hiddenOnSmallScreens': {
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    '& .column-tags': {
        minWidth: '9em',
    },
    '& .created': { fontStyle: 'italic' },
    '& .last_update': { fontStyle: 'italic' },
}));

const postListBulkActions = (
    <>
        <BulkDeleteButton />
        <BulkExportButton />
    </>
);

const postListActions = (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const rowClick = (_id: Identifier, _resource: string, record: RaRecord): "edit" | "show" => {
    if (record.commentable) {
        return 'edit';
    }

    return 'show';
};

const DesktopListPage: React.FC<{ elements: React.JSX.Element[], filters: { [key: string]: string | number } }> = ({ elements, filters = {} }) => {
    return (    
        <List
            filters={postFilter}
            sort={{ field: 'published_at', order: 'DESC' }}
            exporter={exporter}
            filter={filters}
            actions={postListActions}
            sx={{ maxWidth: { md: 'auto', lg: "85%" } }}
        >
            <StyledDatagrid
                bulkActionButtons={postListBulkActions}
                rowClick={rowClick}
                omit={['average_note']}
            >
                {...elements}
            </StyledDatagrid>
        </List>
    )
};

const ListPage: React.FC<{ elements?: React.JSX.Element[], filters?: { [key: string]: string | number }, blockFilters: boolean }> = ({ elements = [], filters = {}, blockFilters = false }) => {
    const isSmall = useMediaQuery<Theme>(
        theme => theme.breakpoints.down('md'),
        { noSsr: true }
    );

    const { permissions } = usePermissions()
    const { data: user } = useGetIdentity()

    const filter = (permissions != "doctor") ? (blockFilters) ? filters : { patient_id: user?.patient_id, ...filters } : {}
    console.log(filter)
    return isSmall ? <MobileListPage filters={filter} /> : <DesktopListPage elements={elements} filters={filter} />;
};

export default ListPage;