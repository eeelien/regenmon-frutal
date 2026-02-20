'use client';
import { useState } from 'react';
import { DinoType } from '@/lib/types';
import { DINO_INFO } from '@/lib/constants';
import DinoSprite from '@/components/ui/DinoSprite';

interface Props { onCreate: (name: string, type: DinoType) => void; }

export default function CreationScreen({ onCreate }: Props) {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<DinoType | null>(null);
  const valid = name.length >= 2 && name.length <= 15 && selected;

  return (
    <div className="creation-screen">
      <h1 className="creation-title">🥚 Crea tu Regenmon</h1>
      <div className="nes-field" style={{ maxWidth: '300px', margin: '20px auto' }}>
        <label htmlFor="name">Nombre (2-15 chars)</label>
        <input
          id="name"
          className="nes-input"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={15}
          placeholder="Nombre..."
        />
      </div>
      <div className="dino-selector">
        {(Object.keys(DINO_INFO) as DinoType[]).map(type => (
          <div
            key={type}
            className={`dino-card nes-container ${selected === type ? 'is-primary selected-card' : 'is-dark'}`}
            onClick={() => setSelected(type)}
          >
            <DinoSprite type={type} expression="happy" size={80} />
            <h3>{DINO_INFO[type].emoji} {DINO_INFO[type].name}</h3>
            <p style={{ fontSize: '10px' }}>{DINO_INFO[type].desc}</p>
          </div>
        ))}
      </div>
      <button
        className={`nes-btn ${valid ? 'is-warning' : 'is-disabled'}`}
        disabled={!valid}
        onClick={() => valid && selected && onCreate(name, selected)}
        style={{ marginTop: '20px', fontSize: '14px' }}
      >
        🥚 ¡Eclosionar!
      </button>
    </div>
  );
}
