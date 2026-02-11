import React, { useState } from 'react';
import './CameraComparison.css';

const CameraComparison = () => {
    const [sliderValue, setSliderValue] = useState(50);

    const handleInput = (e) => {
        setSliderValue(e.target.value);
    };

    return (
        <section className="camera-comparison-section">
            <div className="container">
                <div className="comparison-content">
                    <div className="text-content">
                        <span className="eyebrow">Night Photography</span>
                        <h2 className="title">Cañete de Noche: Comparativa.</h2>
                        <p className="description">
                            Compara la calidad de imagen entre los dos líderes del mercado.
                            Desliza para ver la diferencia en procesamiento de color y detalle.
                        </p>

                        <div className="comparison-legend">
                            <div className="legend-item">
                                <h4>iPhone Night</h4>
                                <p>Tonos cálidos y naturales.</p>
                            </div>
                            <div className="legend-item right-align">
                                <h4>Pixel Night</h4>
                                <p>Alto rango dinámico (HDR).</p>
                            </div>
                        </div>
                    </div>

                    <div className="comparison-visual">
                        <div className="image-container">
                            <img
                                src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1200"
                                alt="iPhone Night"
                                className="comparison-image base-image"
                            />
                            {/* Overlay Label for Before Image (Left) */}
                            <div className="image-label label-left">
                                <span className="label-text">iPhone 15 Pro Max</span>
                            </div>

                            <img
                                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200"
                                alt="Pixel Night"
                                className="comparison-image overlay-image"
                                style={{ clipPath: `inset(0 0 0 ${sliderValue}%)` }}
                            />
                            {/* Overlay Label for After Image (Right) */}
                            <div className="image-label label-right">
                                <span className="label-text">Pixel 8 Pro</span>
                            </div>

                            <div
                                className="slider-handle"
                                style={{ left: `${sliderValue}%` }}
                            >
                                <div className="slider-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 8 4 4-4 4M6 8l-4 4 4 4" /></svg>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sliderValue}
                                onChange={handleInput}
                                className="slider-input"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CameraComparison;
