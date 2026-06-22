import { FiPlus } from 'react-icons/fi'
import { documents } from '../data/documents'
import { formatCreatedDate, relativeTime } from '../utils/relativeTime'

// ─── File-type config ────────────────────────────────────────────────────────
const FILE_TYPE_CONFIG = {
  pdf: {
    letter: null,
    icon: (
      // Adobe-style PDF icon (red swirl)
      <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none">
        <path
          d="M24 8C15.163 8 8 15.163 8 24s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8z"
          fill="#FF5252"
          opacity=".15"
        />
        <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
          fontSize="28" fontWeight="800" fill="#E53935" fontFamily="Georgia,serif">
          A
        </text>
        {/* swirl accent */}
        <path d="M18 30 Q22 22 28 26 Q32 30 26 34" stroke="#E53935" strokeWidth="2.5"
          fill="none" strokeLinecap="round"/>
      </svg>
    ),
    bg: '#FFF5F5',
  },
  xlsx: {
    letter: 'X',
    color: '#43A047',
    bg: '#F1F8F1',
  },
  doc: {
    letter: 'W',
    color: '#1565C0',
    bg: '#EEF4FF',
  },
  pptx: {
    letter: 'P',
    color: '#E53935',
    bg: '#FFF5F5',
  },
}

function getFileExt(name = '') {
  return name.split('.').pop()?.toLowerCase() ?? 'doc'
}

// ─── Individual file-type icon ────────────────────────────────────────────────
function FileIcon({ name }) {
  const ext = getFileExt(name)
  const cfg = FILE_TYPE_CONFIG[ext] ?? FILE_TYPE_CONFIG.doc

  // PDF gets a special SVG icon
  if (ext === 'pdf') {
    return (
      <div
        className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl"
        style={{ background: cfg.bg }}
      >
        {/* Acrobat-style PDF mark */}
        <PdfMark />
      </div>
    )
  }

  return (
    <div
      className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl"
      style={{ background: cfg.bg }}
    >
      {/* Folded-corner document shape */}
      <div className="relative flex h-14 w-11 items-center justify-center">
        <svg viewBox="0 0 44 56" className="absolute inset-0 h-full w-full" fill="none">
          <path
            d="M4 2h24l12 12v38a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="1.5"
          />
          <path d="M28 2v10a2 2 0 002 2h10" stroke="#E5E7EB" strokeWidth="1.5" fill="none"/>
        </svg>
        <span
          className="relative z-10 text-2xl font-black leading-none"
          style={{ color: cfg.color }}
        >
          {cfg.letter}
        </span>
      </div>
    </div>
  )
}

function PdfMark() {
  return (
    <div className="relative flex h-14 w-11 items-center justify-center">
      <svg viewBox="0 0 44 56" className="absolute inset-0 h-full w-full" fill="none">
        <path
          d="M4 2h24l12 12v38a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="1.5"
        />
        <path d="M28 2v10a2 2 0 002 2h10" stroke="#E5E7EB" strokeWidth="1.5" fill="none"/>
      </svg>
      {/* Adobe swirl mark */}
      <svg viewBox="0 0 32 32" className="relative z-10 h-7 w-7">
        <path
          d="M16 4C9.373 4 4 9.373 4 16c0 3.48 1.41 6.63 3.686 8.9L16 16l8.314 8.9A11.954 11.954 0 0028 16c0-6.627-5.373-12-12-12z"
          fill="#E53935"
          opacity=".9"
        />
        <path
          d="M10 22 Q14 14 20 18 Q24 22 18 28"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

// ─── Single document card ────────────────────────────────────────────────────
function DocCard({ doc }) {
  return (
    <div className="group cursor-pointer rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Icon */}
      <div className="mb-3 flex justify-center">
        <FileIcon name={doc.name} />
      </div>

      {/* Meta row */}
      <div className="mb-1 flex items-center justify-between text-[11px] text-textSecondary">
        <span>{formatCreatedDate(doc.createdAt)}</span>
        <span className="font-semibold text-primary">{doc.size}</span>
      </div>

      {/* File name */}
      <div className="mb-0.5 flex items-center gap-1.5">
        <svg className="h-3.5 w-3.5 shrink-0 text-textSecondary" viewBox="0 0 16 16" fill="currentColor">
          <rect x="2" y="2" width="5" height="5" rx="0.5"/>
          <rect x="9" y="2" width="5" height="5" rx="0.5"/>
          <rect x="2" y="9" width="5" height="5" rx="0.5"/>
          <rect x="9" y="9" width="5" height="5" rx="0.5"/>
        </svg>
        <span className="truncate text-xs font-semibold text-textPrimary">{doc.name}</span>
      </div>

      {/* Opened time */}
      <p className="text-[11px] text-textSecondary">
        You opened{' '}
        <span className="font-medium text-primary">{relativeTime(doc.lastOpened)}</span>
      </p>
    </div>
  )
}

// ─── Card grid section ───────────────────────────────────────────────────────
function DocGrid({ title, docs }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-bold text-textPrimary">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {docs.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function DocumentsPage() {
  // Split into "recently viewed" (first 8) and "all documents" (rest or all)
  const recentDocs = documents.slice(0, 8)
  const allDocs = documents.length > 8 ? documents : documents

  return (
    <div>
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-textPrimary">Document</h1>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95">
          <FiPlus size={16} />
          Add Document
        </button>
      </div>

      {/* Recently viewed */}
      <DocGrid title="Recently viewed" docs={recentDocs} />

      {/* Divider */}
      <div className="mb-8 border-t border-border" />

      {/* All documents */}
      <DocGrid title="All Documents" docs={allDocs} />
    </div>
  )
}
