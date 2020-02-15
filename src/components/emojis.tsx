import React from 'react';

const emojis = ['laugh', 'poo', 'wink-tongue', 'boom', 'bomb', 'tada', 'halloween', 'dice'];
const symbols = [...new Array(30)].map(
    (_, i) => emojis[Math.round(Math.random() * (emojis.length - 1))]
);

// tslint:disable-next-line:variable-name
export const Emojis: React.FC = () => {
    return (
        <div className="emojis">
            {symbols.map((symbol, i) => {
                return <span key={i + 1} className={`symbol trajectory-${i + 1} ${symbol}`} />;
            })}
        </div>
    );
};
