type DataInterface = {
  id: number | string;
  name: number | string;
  value?: number | string;
};

interface SelectProps<T extends DataInterface> {
  data?: T[];
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = <T extends DataInterface>({
  label,
  handleChange,
  data = [],
}: SelectProps<T>) => {
  if (!data?.length) {
    return null;
  }

  return (
    <label>
      {label}
      <br />
      <select onChange={handleChange}>
        {data.map((item) => (
          <option key={item.id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <br />
      <br />
    </label>
  );
};
