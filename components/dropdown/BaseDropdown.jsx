import { EllipsisVertical } from 'lucide-react'
import React from 'react'

export default function BaseDropdown({ children }) {
    return (
        <div className="dropdown dropdown-end">
            <button className='btn btn-square'>
                <EllipsisVertical size={18} />
            </button>
            <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-1 w-40 p-2 shadow-sm border border-base-100">
                {children}
            </ul>
        </div>
    )
}
