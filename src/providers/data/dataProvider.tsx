import localForageDataProvider from 'ra-data-local-forage';
// import data from "./data.json";
import data from "./data.tsx"
import { FC, createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { DataProvider as TDataProvider } from 'react-admin';


async function startDataProvider(callback: any) {
  const localForageProvider = await localForageDataProvider({
    defaultData: data,
    loggingEnabled: true
  });
  callback(localForageProvider)
}

interface IDataContext {
  dataProvider: TDataProvider | null,
  setDataProvider: SetStateAction<Dispatch<TDataProvider>>
}

const DataContext = createContext<Partial<IDataContext>>({})

const DataProvider: FC<{ children: any }> = ({ children }) => {
  const [dataProvider, setDataProvider] = useState<TDataProvider | null>(null);

  useEffect(() => {
    if (dataProvider === null) {
      startDataProvider(setDataProvider);
    }
  }, [dataProvider]);

  return (
    <DataContext.Provider value={{ dataProvider, setDataProvider }}>
      {children}
    </DataContext.Provider>
  )
}

const useDataProvider = () => useContext(DataContext)

export {
  useDataProvider,
  DataContext,
  DataProvider,
  type IDataContext
}
