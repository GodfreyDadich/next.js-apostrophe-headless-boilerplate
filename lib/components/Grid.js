export const Row = props => (
  <section className='row'>
    {props.children}
  </section>
)

export const Column = props => (
  <div className={`${props.columns ? `col-${props.columns}` : ''}${props.skip ? ` skip-${props.skip}` : ''}`}>
    {props.children}
  </div>
)
