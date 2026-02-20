'use client';

interface Props {
  fruta: number | null;
}

export default function FrutaCounter({ fruta }: Props) {
  return (
    <span className="fruta-counter">
      🍊 {fruta !== null ? fruta : '---'} $FRUTA
    </span>
  );
}
