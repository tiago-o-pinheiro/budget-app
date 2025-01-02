interface PadButtonsProps {
  label?: string;
  style?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export const PadButtons = ({
  label,
  style = "bg-gray-200 text-gray-600/75",
  children,
  onClick,
}: PadButtonsProps) => {
  return (
    <button
      className={`text-3xl py-2 rounded-3xl h-20 hover:opacity-75 ${style}`}
      onClick={onClick}
    >
      {label ?? children}
    </button>
  );
};
