import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  width = '100px'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find(opt => String(opt.value) === String(value))?.label || " ";

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        style={{ width: width ,minHeight: '45px' }}
        className="cursor-pointer border-2 font-semibold text-m rounded-lg block w-full h-100 px-4 py-2 border-green-600 relative"
      >
        {selectedLabel}
        
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2"
          onClick={toggleDropdown}
          style={{
            width: '15px',
            height: '100%',
            backgroundColor: '#00803a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src="/images/down-arrow.png" 
            alt="arrow"  
            width={8}
            height={8}
          />
        </div>
      </div>

      {isOpen && (
  <div
    className="absolute left-0 right-0 mt-2 bg-white border-2 rounded-lg shadow-lg overflow-auto"
    style={{ maxHeight: '150px', zIndex:10}}
  >
    {options.map((option) => (
      <div
        key={option.value}
        onClick={() => handleSelect(String(option.value))}
        className="px-4 py-2 hover:bg-[#00803a] hover:text-white cursor-pointer"
      >
        {option.label}
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default CustomSelect;
