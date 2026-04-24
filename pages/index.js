import { useState } from "react";

export default function App() {
  const totalStickers = 980;

  const [stickers, setStickers] = useState(
    Array.from({ length: totalStickers }, (_, i) => ({
      id: i + 1,
      owned: false,
      duplicate: false,
    }))
  );

  const toggleOwned = (id) => {
    setStickers((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, owned: !s.owned, duplicate: false } : s
      )
    );
  };

  const toggleDuplicate = (id) => {
    setStickers((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, duplicate: !s.duplicate, owned: true } : s
      )
    );
  };

  const ownedCount = stickers.filter((s) => s.owned).length;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Panini WC 2026 Tracker</h1>
      <p className="mb-4">
        Progresso: {ownedCount}/{totalStickers}
      </p>

      <div className="grid grid-cols-5 gap-2">
        {stickers.map((s) => (
          <div
            key={s.id}
            className={`p-2 text-center rounded-xl text-sm cursor-pointer ${
              s.duplicate
                ? "bg-yellow-300"
                : s.owned
                ? "bg-green-400"
                : "bg-gray-200"
            }`}
            onClick={() => toggleOwned(s.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              toggleDuplicate(s.id);
            }}
          >
            {s.id}
          </div>
        ))}
      </div>
    </div>
  );
}
