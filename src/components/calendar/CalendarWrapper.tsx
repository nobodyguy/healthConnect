import { Title, ListToolbar, TopToolbar, CreateButton, ExportButton, useListContext } from "react-admin";
import { Card } from "@mui/material";
import Calendar from "./Calendar";
import { CalendarContextProvider } from "./CalendarContext";
import PrefillButton from "./PrefillButton";

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <PrefillButton />
        <ExportButton />
    </TopToolbar>
);

const CalendarWrapper = (_props: any) => {
    const { defaultTitle } = useListContext();
    return (
        <CalendarContextProvider>
            <Title title={defaultTitle} />
            <ListToolbar actions={<ListActions />} />
            <Card>
                <Calendar />
            </Card>
        </CalendarContextProvider>
    );
};

export default CalendarWrapper;
