'use client';
import { useState } from 'react';
import { ActivityEntry } from '@/lib/types';

interface Props { activity: ActivityEntry[]; }

export default function ActivityHistory({ activity }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="activity-history">
      <button className="nes-btn is-normal" onClick={() => setOpen(!open)} style={{ fontSize: '10px', width: '100%' }}>
        📋 Historial {open ? '▲' : '▼'}
      </button>
      {open && (
        <div className="nes-container is-dark" style={{ marginTop: '8px', maxHeight: '200px', overflowY: 'auto' }}>
          {activity.length === 0 && <p style={{ fontSize: '10px' }}>Sin actividad aún</p>}
          {activity.map((a, i) => (
            <div key={i} style={{ fontSize: '10px', padding: '2px 0', borderBottom: '1px solid #333' }}>
              {a.action} {a.coins !== 0 && <span style={{ color: a.coins > 0 ? '#66bb6a' : '#ff7043' }}>{a.coins > 0 ? '+' : ''}{a.coins}🍊</span>}
              <span style={{ float: 'right', opacity: 0.6 }}>{new Date(a.date).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
