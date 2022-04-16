import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import ICustomer from "../../interfaces/iCustomer";
import classes from "./customer-item.module.css";

const CustomerItem = ({ customer }: { key: string; customer: ICustomer }) => {
  const { _id, name, address } = customer;
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push("/" + _id);
  };
  return (
    <li className={classes.item}>
      <Paper>
        <div className={classes.content}>
          <h3>{name}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Paper>
    </li>
  );
};

export default CustomerItem;
