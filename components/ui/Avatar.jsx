'use client';

import React, { useState } from 'react';
import ProfileAvatarSkeleton from '../skeleton/ProfileAvatarSkeleton';
import Avatar from 'boring-avatars';

export default function ProfileAvatar({ imgUrl, firstName, lastName, className }) {
    const [isLoading, setIsLoading] = useState(true);
    const fallbackUrl = `https://avatar.iran.liara.run/username?username=${firstName + lastName}`;

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="avatar">
            <div className={`relative w-11 h-11 rounded-full overflow-hidden bg-neutral-600 ${className}`}>
                {isLoading && (
                    <ProfileAvatarSkeleton />
                )}

                {/* <img
                    src={imgUrl || fallbackUrl}
                    alt="user profile"
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={handleImageLoad}
                /> */}
                <Avatar name={firstName+lastName} variant='beam'/>
            </div>
        </div>
    );
}