import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, GitCompare } from 'lucide-react';
import './CompareBar.css';

const CompareBar = ({ compareList, removeFromCompare, clearCompare }) => {
    if (compareList.length === 0) return null;

    return (
        <div className="compare-bar-container">
            <div className="compare-bar-content container">
                <div className="compare-items">
                    {compareList.map(product => (
                        <div key={product.id} className="compare-item-thumb">
                            <img src={product.image} alt={product.name} />
                            <button
                                className="remove-compare-btn"
                                onClick={() => removeFromCompare(product.id)}
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                    <div className="compare-count">
                        <span>{compareList.length}</span> / 2
                    </div>
                </div>

                <div className="compare-actions">
                    <button onClick={clearCompare} className="btn-clear-compare">
                        Limpiar
                    </button>
                    <Link
                        to={`/compare?p1=${compareList[0]?.id}&p2=${compareList[1]?.id || ''}`}
                        className={`btn-compare-now ${compareList.length < 2 ? 'disabled' : ''}`}
                        onClick={(e) => compareList.length < 2 && e.preventDefault()}
                    >
                        <GitCompare size={18} />
                        Comparar
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CompareBar;
