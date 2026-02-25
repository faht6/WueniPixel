import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            {/* Skeleton Image Container — matches 260×260 ProductCard */}
            <div className="skeleton-image-wrapper">
                <div className="skeleton-image">
                    <div className="skeleton-image-inner" />
                </div>
            </div>
            {/* Skeleton Content */}
            <div className="skeleton-content">
                <div>
                    <div className="skeleton-brand" />
                    <div className="skeleton-title" />
                    <div className="skeleton-subtitle" />
                </div>
                <div className="skeleton-bottom">
                    <div className="skeleton-price" />
                    <div className="skeleton-actions">
                        <div className="skeleton-button" />
                        <div className="skeleton-button-small" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
