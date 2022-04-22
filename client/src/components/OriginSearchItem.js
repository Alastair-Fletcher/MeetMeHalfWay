import { useState } from 'react';

const OriginSearchItem = ({ allAirports, listId, fieldref }) => {
  const [originInput, setOriginInput] = useState('');

  const filteredAirports = allAirports.filter(el => {
    const lowerCaseOriginInput = originInput.toLowerCase();
    return el.code.toLowerCase().includes(lowerCaseOriginInput) ||
      el.name.toLowerCase().includes(lowerCaseOriginInput) ||
      el.city.toLowerCase().includes(lowerCaseOriginInput) ||
      el.state.toLowerCase().includes(lowerCaseOriginInput) ||
      el.country.toLowerCase().includes(lowerCaseOriginInput)
  })
  const shortlistFilteredAirports = filteredAirports.slice(0, 7);
  // console.log({shortlistFilteredAirports});
  // console.log({ allAirports });
  // console.log({ filteredAirports });
  // console.log({ shortlistFilteredAirports });

  return (
    <div className='OriginSearchItem'>
      <label>
        Origin
        <input
          ref={fieldref}
          list={listId}
          name='airport-city'
          onChange={(e) => {
            setOriginInput(e.target.value)
          }
          }
        />
      </label>
      <datalist id={listId}>
        {shortlistFilteredAirports.map(airport => {
          return <option key={airport.code} value={airport.code}>{`${airport.name} (${airport.city}, ${airport.country})`}</option>
        })}
      </datalist>
    </div>
  )
}

export default OriginSearchItem