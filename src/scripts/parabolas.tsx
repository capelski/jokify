import React, { useState } from 'react';

interface ParabolasProps {
    animate: boolean;
}

const emojis = ['laugh', 'poo', 'wink-tongue', 'boom', 'bomb', 'tada', 'halloween', 'dice'];
const symbols = [...new Array(50)].map(
    (_, i) => emojis[Math.round(Math.random() * (emojis.length - 1))]
);

// tslint:disable-next-line:variable-name
export const Parabolas: React.FC<ParabolasProps> = props => {
    const [animate, setAnimate] = useState(false);

    if (!animate && props.animate) {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 2000);
    }

    return (
        <div className="parabolas">
            {symbols.map((symbol, i) => {
                return (
                    <span
                        key={i + 1}
                        className={`symbol trajectory-${i + 1} ${symbol} ${
                            animate ? 'parabola' : ''
                        }`}
                    />
                );
            })}
        </div>
    );
};
