interface LanguageOptions {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: LanguageOptions[];
  className?: string;
}

export const LanguageSelector = ({
  value,
  onChange,
  options,
  className = '',
}: LanguageSelectorProps ) => {
  return (
    <select className='w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
