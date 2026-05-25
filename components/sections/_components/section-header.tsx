import { FC } from 'react'

const SectionHeader: FC<{ label: string; title: string; subTitle: string }> = ({ label, title, subTitle }) => {
  return (
    <div className="relative mx-auto mb-16 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-400">
        {label}
      </p>
      <h2 className="text-3xl font-bold text-surface-50 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-surface-400 leading-relaxed max-w-xl mx-auto">
        {subTitle}
      </p>
    </div>
  )
}

export default SectionHeader