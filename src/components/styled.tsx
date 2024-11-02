import { categoriesColors, statusColors, urgencyColors } from '../providers/enums';
import { styled } from '@mui/material/styles';
import {
    ChipField,
    useRecordContext,
} from 'react-admin'; // eslint-disable-line import/no-unresolved


const colors: any = {
    status: statusColors,
    category: categoriesColors,
    urgency: urgencyColors
}

const StyledChip = styled(ChipField)((props) => {
    const record: any = useRecordContext();
    return { backgroundColor: colors[props.source][record[props.source]] }
});

export { StyledChip }