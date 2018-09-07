export const Row = props => (
  <section className='row'>
    {props.children}
  </section>
)

export const Column = props => (
  <div className={`col-${props.columns}`}>
    {props.children}
  </div>
)
