import React from 'react'

export default function StatusBadge({ status }) {
    const badgeColor = (() => {
        switch (status) {
            case "pending":
                return "";
            case "approved":
                return "badge-success";
            case "rejected":
                return "badge-error";
            default:
                return "";
        }
    })();
    return (
        <div className={`relative w-fit badge badge-sm ${badgeColor} items-baseline transition-all duration-300 transition-discrete`}>
            {(status || "pending").charAt(0).toUpperCase() + (status || "pending").slice(1)}
        </div>
    )
}
