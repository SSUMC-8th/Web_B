interface SelectBoxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label: string
  id?: string
  className?: string
}

export const SelectBox = ({ checked = false, onChange, label, id = 'checkbox', className }: SelectBoxProps) => {
  return (
    <div className= {`flex items-center ${className}`}>
      <input 
        type="checkbox" 
        id={id} 
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="size-4 rounded border-gray-300 text-blue-600 bg-gray-200 focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700"> {label} </label>
    </div>
  )
}