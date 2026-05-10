// import React from 'react';
// import { ChevronDownIcon } from 'lucide-react';

// interface SelectOption {
//     value: string | number;
//     label: string;
// }

// interface SelectProps {
//     label?: string;
//     value: string | number;
//     onChange: (value: string | number) => void;
//     options?: SelectOption[];
//     className?: string;
//     required?: boolean;
//     placeholder?: string;
// }

// export default function Select({ label, value, onChange, options = [], className = '', required = false, placeholder = 'Select an option' }: SelectProps) {
//     return (
//         <div className={`space-y-2 ${className}`}>
//             {label && (
//                 <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>
//                     {label}
//                     {required && <span className='text-red-500 ml-1'>*</span>}
//                 </label>
//             )}
//             <div className='relative'>
//                 <select
//                     value={value}
//                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
//                     className='w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 cursor-pointer'
//                 >
//                     <option value='' disabled>
//                         {placeholder}
//                     </option>
//                     {options.map((option) => (
//                         <option key={option.value} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//                 <ChevronDownIcon className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none' />
//             </div>
//         </div>
//     );
// }
import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    label?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    options?: SelectOption[];
    className?: string;
    required?: boolean;
    placeholder?: string;
}

export default function Select({ label, value, onChange, options = [], className = '', required = false, placeholder = 'Select an option' }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find(o => String(o.value) === String(value));

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`space-y-2 ${className}`} ref={ref}>
            {label && (
                <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>
                    {label}
                    {required && <span className='text-red-500 ml-1'>*</span>}
                </label>
            )}
            <div className='relative'>
                {/* Trigger — looks exactly like original */}
                <button
                    type='button'
                    onClick={() => setIsOpen(!isOpen)}
                    className='w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-left text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 cursor-pointer'
                >
                    {selected ? selected.label : <span className='text-slate-400'>{placeholder}</span>}
                </button>
                <ChevronDownIcon className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none' />

                {/* Custom dropdown list — selected option is blue */}
                {isOpen && (
                    <div className='absolute z-50 w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-lg overflow-hidden'>
                        <p className='px-4 pt-3 pb-1 text-sm text-slate-400'>{placeholder}</p>
                        {options.map((option) => (
                            <button
                                type='button'
                                key={option.value}
                                onClick={() => { onChange(option.value); setIsOpen(false); }}
                                className={`w-full px-4 py-3 text-left text-sm transition-colors duration-150
                                    ${String(option.value) === String(value)
                                        ? 'bg-blue-500 text-white font-medium'
                                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}