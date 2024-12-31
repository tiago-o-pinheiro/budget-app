import {
  useForm,
  FormProvider,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";

interface FormsProviderProps<T> {
  children: React.ReactNode;
  defaultValues?: DefaultValues<T>;
}

export const FormsProvider = <T extends Record<string, any>>({
  children,
  defaultValues,
}: FormsProviderProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<T> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
