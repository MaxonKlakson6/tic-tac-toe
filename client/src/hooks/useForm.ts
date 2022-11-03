import { ChangeEvent, useState } from "react";

type UseFormReturnValues<Form> = [
  form: Form,
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void,
  resetField: (name: keyof Form) => void
];

export const useForm = <InitialState>(
  initialState: InitialState
): UseFormReturnValues<InitialState> => {
  const [form, setForm] = useState<InitialState>(initialState);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetField = (name: keyof InitialState): void => {
    setForm((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  return [form, handleFormChange, resetField];
};
