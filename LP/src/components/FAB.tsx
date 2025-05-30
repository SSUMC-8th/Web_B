import { Plus } from "lucide-react";

interface FABProps {
  onClick: () => void;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

const FAB = ({ onClick, icon = <Plus />, ariaLabel = "Add" }: FABProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="fixed bottom-6 right-6 z-50 bg-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg hover:bg-pink-600 transition-all"
    >
      {icon}
    </button>
  );
};

export default FAB;
