import fakeRestDataProvider from "ra-data-fakerest";
import data from "./data.json";

const dataProvider = fakeRestDataProvider(
  data,
  process.env.NODE_ENV !== "test",
  300,
);

export default dataProvider;
