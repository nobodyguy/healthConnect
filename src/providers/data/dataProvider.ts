import localForageDataProvider from "ra-data-local-forage";
import data from "./data.json";

async function dataProviderFactory(callback: any) {
  const localForageProvider = await localForageDataProvider({
    defaultData: data,
    loggingEnabled: true,
  });
  callback(localForageProvider);
}

export default dataProviderFactory;
