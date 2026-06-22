import RecentlyViewed from '../components/images/RecentlyViewed'
import ImageGrid from '../components/images/ImageGrid'

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

export default function ImagesPage() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-textPrimary">Images</h1>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95">
          <GridIcon />
          Add Image
        </button>
      </div>

      <RecentlyViewed />
      <ImageGrid />
    </div>
  )
}