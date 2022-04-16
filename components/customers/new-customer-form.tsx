import classes from "./new-customer-form.module.css";
import { Button, Box } from "@mui/material";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import ICustomer from "../../interfaces/iCustomer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextFieldElement from "../ui/TextFieldElement";
import { BoxMargin } from "../ui/Shared";
import SelectElement from "../ui/SelectElement";

const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    description: yup.string().required(),
    // age: yup.number().positive().integer().required(),
  })
  .required();

const NewCustomerForm = (props: any) => {
  const { handleSubmit, control } = useForm<ICustomer>({
    defaultValues: {
      name: "",
      address: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const formSubmiHandler: SubmitHandler<ICustomer> = (data: ICustomer) => {
    props.onAddCustomer(data);
  };

  const countries = [
    { id: "1", title: "USA" },
    { id: "3", title: "Australia" },
    { id: "6", title: "Iran" },
  ];

  return (
    <form onSubmit={handleSubmit(formSubmiHandler)}>
      <BoxMargin>
        <TextFieldElement
          name={"name"}
          control={control}
          label={"Name"}
          required={true}
          parseError={(error: FieldError) => {
            return error.message?.toString();
          }}
          fullWidth
          variant="outlined"
        />
        <TextFieldElement
          name={"address"}
          control={control}
          label={"Address"}
          required={true}
          parseError={(error: FieldError) => {
            return error.message?.toString();
          }}
          fullWidth
          variant="outlined"
        />
        <TextFieldElement
          name={"description"}
          control={control}
          label={"Description"}
          required={true}
          parseError={(error: FieldError) => {
            return error.message?.toString();
          }}
          fullWidth
          variant="outlined"
          rows={4}
        />
        <SelectElement
          name={"location"}
          control={control}
          label={"Location"}
          // required={true}
          options={countries}
          fullWidth
        />
        <br />
        <div className={classes.actions}>
          <Button type={"submit"} color={"primary"} variant={"contained"}>
            Add Customer
          </Button>
          {/* <button type="submit">Add Customer</button> */}
        </div>
      </BoxMargin>
    </form>
  );
};
export default NewCustomerForm;
