import { categoriesColors, statusColors, urgencyColors } from '../providers/enums';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import {
    useRecordContext,
    useTranslate,
    ChipField
} from 'react-admin'; // eslint-disable-line import/no-unresolved


const colors: any = {
    status: statusColors,
    category: categoriesColors,
    urgency: urgencyColors
}

const CustomChipField = ({ source, onClick }) => {
    const record: any = useRecordContext();
    const translate = useTranslate();
    return <Chip label={translate(record[source])} onClick={onClick} />
};

const StyledChip = styled(ChipField)((props) => {
    const record: any = useRecordContext();
    return { backgroundColor: colors[props.source][record[props.source]] }
});

export { StyledChip }