import React from "react";

const UsersIllustration = () => {
  return (
    <svg
      viewBox="0 0 540 390"
      className="h-auto w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M214 67h28l10 11v47l-10 10h-28l10-10V77l-10-10Z" fill="#FBFBFC" stroke="#E5E7EB" />
      <rect x="236" y="97" width="18" height="18" fill="#E5E7EB" />

      <rect x="227" y="198" width="312" height="151" rx="10" fill="#F4F5F7" stroke="#64748B" />
      <rect x="227" y="198" width="312" height="24" rx="10" fill="#25B8B1" />
      <circle cx="241" cy="210" r="3.5" fill="#fff" />
      <circle cx="252" cy="210" r="3.5" fill="#fff" />
      <circle cx="263" cy="210" r="3.5" fill="#fff" />

      <rect x="154" y="194" width="180" height="164" rx="14" fill="#fff" stroke="#64748B" />
      <rect x="154" y="194" width="180" height="24" rx="14" fill="#25B8B1" />
      <circle cx="167" cy="206" r="3.5" fill="#fff" />
      <circle cx="178" cy="206" r="3.5" fill="#fff" />
      <circle cx="189" cy="206" r="3.5" fill="#fff" />

      <rect x="327" y="42" width="180" height="164" rx="14" fill="#fff" stroke="#64748B" />
      <rect x="327" y="42" width="180" height="24" rx="14" fill="#25B8B1" />
      <circle cx="340" cy="54" r="3.5" fill="#fff" />
      <circle cx="351" cy="54" r="3.5" fill="#fff" />
      <circle cx="362" cy="54" r="3.5" fill="#fff" />

      <rect x="145" y="309" width="389" height="1.5" fill="#CBD5E1" />

      <rect x="170" y="218" width="72" height="66" rx="4" fill="#F8FAFC" />
      <circle cx="210" cy="245" r="18" fill="#FED7AA" />
      <path d="M193 284c2-20 13-30 24-30s22 10 24 30h-48Z" fill="#EA580C" />
      <path d="M198 239c2-9 9-15 18-15 10 0 18 8 18 19v5c-2-3-5-6-9-9-3-3-6-5-8-8-1 3-4 6-8 8-3 2-6 4-9 5v-5Z" fill="#374151" />
      <circle cx="202" cy="245" r="2.5" fill="#111827" />
      <circle cx="219" cy="245" r="2.5" fill="#111827" />

      <rect x="344" y="66" width="72" height="66" rx="4" fill="#F8FAFC" />
      <circle cx="381" cy="94" r="18" fill="#FED7AA" />
      <path d="M364 132c2-20 13-30 24-30 12 0 22 10 24 30h-48Z" fill="#2FBF9B" />
      <path d="M367 90c0-11 8-20 18-20 9 0 16 6 18 15-3-2-6-1-8 1 1-5-1-10-6-12-6-3-13 0-16 7-1 4 0 8 2 11l-8 4c0-2 0-4 0-6Z" fill="#374151" />
      <circle cx="374" cy="95" r="2.5" fill="#111827" />
      <circle cx="389" cy="95" r="2.5" fill="#111827" />

      <rect x="429" y="218" width="72" height="66" rx="4" fill="#F8FAFC" />
      <circle cx="466" cy="245" r="18" fill="#FDBA74" />
      <path d="M449 284c2-20 13-30 24-30 12 0 22 10 24 30h-48Z" fill="#22B3A7" />
      <path d="M451 236c2-8 10-14 19-14 10 0 18 7 18 17l-2 1c-5-3-9-2-12-6v4c-7-2-12-5-15-11-2 2-5 6-8 9Z" fill="#E5E7EB" />
      <circle cx="458" cy="245" r="2.5" fill="#111827" />
      <circle cx="473" cy="245" r="2.5" fill="#111827" />

      <rect x="154" y="284" width="180" height="36" fill="#F3F4F6" />
      <rect x="327" y="132" width="180" height="36" fill="#F3F4F6" />
      <rect x="429" y="284" width="110" height="36" fill="#F3F4F6" />

      <path d="M188 227c2 11 7 21 21 26" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M386 72c4 6 3 13-1 20" stroke="#22B3A7" strokeWidth="2" strokeLinecap="round" />
      <path d="M470 222c5 6 7 14 4 24" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" />

      {[
        [252, 239, 32],
        [252, 252, 45],
        [252, 265, 40],
        [174, 332, 28],
        [174, 344, 18],
        [259, 332, 30],
        [259, 344, 22],
        [353, 84, 26],
        [353, 97, 44],
        [353, 110, 40],
        [438, 239, 28],
        [438, 252, 41],
        [438, 265, 35]
      ].map(([x, y, width], index) => (
        <rect
          key={index}
          x={x}
          y={y}
          width={width}
          height="2"
          rx="1"
          fill={index % 3 === 0 ? "#6EE7E7" : "#94A3B8"}
        />
      ))}

      {[
        [167, 323, 36],
        [167, 331, 28],
        [167, 339, 42],
        [247, 323, 36],
        [247, 331, 28],
        [247, 339, 42],
        [340, 145, 36],
        [340, 153, 28],
        [340, 161, 42],
        [430, 323, 36],
        [430, 331, 28],
        [430, 339, 42],
        [488, 323, 30],
        [488, 331, 24],
        [488, 339, 34]
      ].map(([x, y, width], index) => (
        <rect key={index} x={x} y={y} width={width} height="2" rx="1" fill="#94A3B8" />
      ))}

      <path
        d="M371 341c7-11 14-17 18-19-2 7-4 14-5 20 7-8 15-15 22-19-4 10-5 19-4 26 5-6 11-11 17-13-2 6-3 11-2 17 4-4 9-7 14-8-2 5-3 11-1 18-4-3-9-4-14-4 3 8 3 16 1 23-4-7-9-12-15-16-1 10-4 19-9 26-2-10-6-18-11-24-2 6-5 12-10 16 0-8-1-15-5-21-3 2-6 5-8 9-1-6 0-12 3-18-4 0-8 1-12 3 1-6 5-12 11-17-5-1-10-1-15 1 3-6 9-11 16-13-4-4-8-6-12-8 8-1 16 0 21 3Z"
        fill="#22B3A7"
      />
      <path d="M394 362c-4 13-7 26-8 40" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      <path d="M386 402h24l-4 20h-16l-4-20Z" fill="#6B7280" />
      <path d="M389 409h18" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M388 416h19" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default UsersIllustration;
