import React from 'react'

function SubBanner({ title, description }) {
    return (
        <div className="bg-sPrimary py-16 text-center text-white">
            <h1 className="text-4xl font-black mb-4">{title}</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto px-4">
                {description}
            </p>
        </div>
    )
}

export default SubBanner