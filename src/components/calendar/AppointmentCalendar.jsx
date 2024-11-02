import * as React from "react";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import cs from "date-fns/locale/cs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import isSameDay from "date-fns/isSameDay";
import "./AppointmentCalendar.css";

export default function AppointmentCalendar({ slots, onSlotSelection }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{ marginTop: "2rem" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card variant="outlined">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems={{ xs: "center", sm: "flex-start" }}
          spacing={{ xs: 0, md: 2 }}
          divider={
            <Divider
              orientation={isSmallScreen ? "horizontal" : "vertical"}
              flexItem
              style={{ marginTop: isSmallScreen ? "-1rem" : "0" }}
            />
          }
        >
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
            <StaticDatePicker
              disablePast
              displayStaticWrapperAs="desktop"
              showToolbar={false}
              label="Kalendář"
              views={["day"]}
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              shouldDisableDate={(date) => {
                const slotsWithinThisDay = slots.filter((slot) => {
                  return isSameDay(slot.start, date);
                });
                return slotsWithinThisDay.length === 0;
              }}
              renderDay={(day, selectedDate, DayComponentProps) => {
                if (DayComponentProps.outsideCurrentMonth) {
                  return <PickersDay {...DayComponentProps} />;
                }

                return (
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                  >
                    <PickersDay {...DayComponentProps} />
                    {!DayComponentProps.disabled && (
                      <span
                        style={{
                          fontSize: "0.5rem",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "#4caf50",
                          transform: "translate(0, 100%)",
                        }}
                      ></span>
                    )}
                  </Stack>
                );
              }}
              renderInput={(params) => {}}
            />
          </LocalizationProvider>
          <Grid
            container
            sx={{
              width: "15rem !important",
              marginTop: { xs: "-20rm !important", sm: "2.5rem !important" },
              paddingRight: { md: "16px !important" },
            }}
            spacing={{ xs: 2 }}
            columns={{ xs: 6, sm: 12, md: 12 }}
            justifyContent="flex-start"
            alignContent="center"
            className="timegrid"
          >
            {slots
              .filter((slot) => isSameDay(slot.start, selectedDate))
              .map((slot) => (
                <>
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    key={slot.id}
                    sx={{
                      marginBottom: "1rem",
                      marginTop: "1rem",
                      padding: "0 !important",
                    }}
                  >
                    <Button
                      onClick={(e) => {
                        setSelectedSlot(slot.id);
                        onSlotSelection(slot);
                      }}
                      style={{
                        backgroundColor:
                          slot.id === selectedSlot ? "#1976d2" : "",
                        color: slot.id === selectedSlot ? "white" : "",
                      }}
                    >
                      {slot.start.toLocaleTimeString("cs-CZ", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Button>
                  </Grid>
                </>
              ))}
          </Grid>
        </Stack>
      </Card>
    </Box>
  );
}
