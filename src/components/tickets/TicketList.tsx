import {
  Datagrid,
  List,
  ReferenceField,
  ReferenceInput,
  useStore,
} from "react-admin";

import { CustomerAvatar } from "./CustomerAvatar";
import { TicketListAside } from "./TicketListAside";
import { StatusField } from "./StatusField";

export const ticketStatusFilters = {
  All: {},
  Open: { status: "open" },
  Pending: { status: "pending" },
  Closed: { status: "closed" },
} as { [key: string]: any };

const filters = [
  <ReferenceInput source="customer_id" reference="customers" alwaysOn />,
  <ReferenceInput source="product_id" reference="products" alwaysOn />,
];

export const TicketList = () => {
  const [statusFilter] = useStore(
    "resources.tickets.list.statusFilter",
    ticketStatusFilters.All
  );
  return (
        <List
          sort={{ field: "updated_at", order: "DESC" }}
          perPage={25}
          filter={statusFilter}
          filters={filters}
          aside={<TicketListAside />}
        >
          <Datagrid
            rowClick="show"
            sx={{
              "& .column-lock": {
                padding: "6px 0",
                "& svg": { verticalAlign: "middle" },
              },
            }}
          >
            <ReferenceField source="customer_id" reference="customers" label="">
              <CustomerAvatar size="small" />
            </ReferenceField>
            <ReferenceField source="customer_id" reference="customers" />
            <StatusField />
          </Datagrid>
        </List>
  );
};
