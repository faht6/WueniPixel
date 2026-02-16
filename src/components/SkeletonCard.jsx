import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
                <div className="skeleton-badges">
                    <div className="skeleton-badge"></div>
                    <div className="skeleton-badge"></div>
                </div>
                <div className="skeleton-title"></div>
                <div className="skeleton-specs">
                    <div className="skeleton-spec"></div>
                    <div className="skeleton-spec"></div>
                </div>
                <div className="skeleton-price"></div>
                <div className="skeleton-actions">
                    <div className="skeleton-button"></div>
                    <div className="skeleton-button-small"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
