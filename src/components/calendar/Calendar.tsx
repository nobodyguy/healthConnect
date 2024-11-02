import { useState, useCallback, useContext } from "react";
//@ts-ignore
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
//@ts-ignore
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useNavigate } from "react-router-dom";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import { cs } from "date-fns/locale";
import {
  useListContext,
  useRedirect,
  useUpdate,
  useNotify,
  useLocale,
} from "react-admin";
import CalendarDeleteButton from "./CalendarDeleteButton";
import { CalendarContext, CalendarContextType } from "./CalendarContext";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./Calendar.css";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  cs: cs,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const allViews = Object.keys(Views).map((k) => Views[k]);

const messages = {
  allDay: "Celý den",
  work_week: "Pracovní týden",
  previous: "<",
  next: ">",
  today: "Dnes",
  month: "Měsíc",
  week: "Týden",
  day: "Den",
  agenda: "Agenda",
  date: "Datum",
  time: "Čas",
  event: "Událost",
  showMore: (total: Number) => `+ Další (${total})`,
  noEventsInRange: "Žádné události v daném rozmezí",
  yesterday: "Včera",
  tomorrow: "Zítra",
};

const MyCalendar = (props: any) => {
  const locale = useLocale();
  const { data } = useListContext();
  const { setCurrentDate } = useContext(CalendarContext) as CalendarContextType;
  const redirect = useRedirect();
  const navigate = useNavigate();
  const notify = useNotify();
  const [update] = useUpdate(undefined, undefined, {
    onSuccess: () => {
      notify("ra.notification.updated", {
        type: "info",
        messageArgs: { smart_count: 1 },
      });
    },
    onError: (error: Error | string) =>
      notify(
        typeof error === "string"
          ? error
          : error.message || "ra.notification.http_error",
        { type: "warning" },
      ),
  });
  const [currentView, setCurrentView] = useState(Views.DAY);
  let events: any = [];
  if (data) {
    events = data.map((appointment: any) => {
      return {
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        title: appointment.client,
        id: appointment.id,
      };
    });
  }

  const handleSelect = useCallback(
    ({ start, end, action, _slots }: any) => {
      if (action === "doubleClick") {
        const title = "Volný slot";
        redirect("create", "appointments", undefined, undefined, {
          record: { client: title, start, end },
        });
      }
    },
    [redirect],
  );

  const updateEvent = useCallback(
    ({ event, start, end }: any) => {
      update("appointments", { id: event.id, data: { start, end } });
    },
    [update],
  );

  return (
    <div style={{ height: "80vh", padding: "1rem" }}>
      <DragAndDropCalendar
        events={events}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
        selectable
        defaultDate={new Date()}
        scrollToTime={new Date()}
        localizer={localizer}
        culture={locale}
        defaultView={Views.DAY}
        views={allViews}
        step={30} // duration of the slot
        timeslots={2} // number of slots within an hour
        dayLayoutAlgorithm="no-overlap"
        formats={
          locale === "cs"
            ? {
                monthHeaderFormat: "MMMM yyyy",
                dayHeaderFormat: "eeee dd. MMMM",
                agendaDateFormat: "eee dd. MMM",
              }
            : null
        }
        onView={(newView: any) => setCurrentView(newView)}
        onSelectSlot={handleSelect}
        eventPropGetter={(event: any) => {
          if (currentView !== Views.AGENDA) {
            const backgroundColor =
              event.title === "Volný slot" ? "#4caf50" : "#1976d2";
            const border =
              event.title === "Volný slot"
                ? "1px solid #43a047"
                : "1px solid #1565c0";
            return { style: { backgroundColor, border } };
          }
        }}
        components={{
          event: (component: any) => {
            const { event } = component;
            return (
              <div
                onClick={(e) => {
                  // bug in react-admin - it doesn't append edit subpath
                  navigate(`/appointments/${event.id}/edit`);
                }}
              >
                {event.title}
                <CalendarDeleteButton appointment={event} />
              </div>
            );
          },

          //eventWrapper: (props) => <EventPopoverWrapper {...props} popover={props.event.title} />,
        }}
        resizable
        onEventResize={updateEvent}
        onEventDrop={updateEvent}
        onNavigate={setCurrentDate}
      />
    </div>
  );
};

export default MyCalendar;
