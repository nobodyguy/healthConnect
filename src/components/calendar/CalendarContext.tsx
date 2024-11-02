import { createContext, useState, PropsWithChildren } from "react";

export interface CalendarContextType {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);
export const CalendarContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    return <CalendarContext.Provider value={{ currentDate, setCurrentDate }}>{children}</CalendarContext.Provider>;
};
