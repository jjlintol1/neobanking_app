import React, { useReducer } from "react";
import { Input } from "../ui/input";
import { formatUSD } from "@/lib/utils";
import { FormLabel } from "../ui/form";

interface MoneyInputProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
}

const MoneyInput = ({ form, name, label, placeholder }: MoneyInputProps) => {
  const initialValue = form.getValues(name)
    ? formatUSD(form.getValues(name))
    : "";

  const [value, setValue] = useReducer((_: any, nextValue: string) => {
    const digits = nextValue.replace(/\D/g, "");
    return formatUSD(Number(digits) / 100);
  }, initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value;
    setValue(formattedValue);
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    form.setValue(name, realValue);
  };

  return (
    <div>
      <FormLabel className="foreground-text">{label}</FormLabel>
      <Input
        type="text"
        className="card no-focus mt-4 min-h-[56px] w-full rounded-md"
        placeholder={placeholder}
        value={value}
        // defaultValue={"0"}
        onChange={handleChange}
      />
    </div>
  );
};

export default MoneyInput;
