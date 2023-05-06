
const PositionsInputs = ({positions}) => {
  return (
    <ul>
        {positions.map(({ id, name }) => (
            <li key={id} className="flex items-center">
              <input
                type="radio"
                name="positionId"
                id={name}
                value={id}
                className="mr-4"
              />
              <label htmlFor={name}>{name}</label>
            </li>
        ))}
    </ul>
  )
}

export default PositionsInputs