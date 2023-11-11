type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};
export default function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      {...props}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-auto"
    >
      {children}
    </button>
  );
}
