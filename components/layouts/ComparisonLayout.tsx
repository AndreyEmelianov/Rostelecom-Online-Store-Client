'use client'
export const ComparisonLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  console.log()

  return (
    <main>
      <section>
        <div className='container'>{children}</div>
      </section>
    </main>
  )
}
