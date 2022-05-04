import OriginSearchItem from './OriginSearchItem';
import { useState, useEffect } from 'react';
import { getDestinationCityList } from '../services/airportsService';
import { findCommonArrayEls } from '../utils/findCommon';
import { Airports, Destination } from '../interfaces';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  allAirports: Airports[];
  setOriginAirports: Dispatch<SetStateAction<string[]>>;
  setDestinationCities: Dispatch<SetStateAction<Destination[]>>;
  queryParamsArray: (string | null)[];
  setSearchParams: any;
  setLatCen: any;
  setLonCen: any;
}

interface HTMLelem extends HTMLElement {
  value: string;
}

const Search = ({
  allAirports,
  setOriginAirports,
  setDestinationCities,
  queryParamsArray,
  setSearchParams,
  setLatCen,
  setLonCen,
}: Props) => {
  const [cityComponents, setCityComponents] = useState(() => {
    let initialState = [];
    if (queryParamsArray[0] === null && queryParamsArray[1] === null) {
      initialState = [
        { index: 1, itemId: 'item1', listId: 'list1', listDefaultVal: '' },
        { index: 2, itemId: 'item2', listId: 'list2', listDefaultVal: '' },
      ];
    } else {
      let counter = 1;
      for (let el of queryParamsArray) {
        if (el !== null) {
          let city = {
            index: counter,
            itemId: `item${counter}`,
            listId: `list${counter}`,
            listDefaultVal: el,
          };
          initialState.push(city);
          counter++;
        }
      }
    }
    return initialState;
  });

  const handleAddCity = () => {
    let counter = cityComponents.length + 1;
    let city = {
      index: counter,
      itemId: `item${counter}`,
      listId: `list${counter}`,
      listDefaultVal: '',
    };
    let cityComp = [...cityComponents];
    cityComp.push(city);
    setCityComponents(cityComp);
  };

  const handleRemoveCity = () => {
    let cityComp = [...cityComponents];
    cityComp.pop();
    setCityComponents(cityComp);
  };

  const handleSearch = () => {
    let promises = [];
    let origins: string[] = [];

    for (let el of cityComponents) {
      let HTMLel: HTMLelem = document.getElementById(el.itemId) as HTMLelem;

      promises.push(getDestinationCityList(HTMLel.value));
      origins.push(HTMLel.value);
      console.log(origins, 'ORIGINS SEARCH HERE');
    }

    setDestinationCities([]);
    console.log(origins, 'ORIGINS AFTER HERE');

    setOriginAirports(origins);

    let queryParamsObject: any = {};
    let counter = 1;
    for (let el of origins) {
      let name = `origin${counter}`;
      counter++;
      queryParamsObject[name] = el;
    }
    setSearchParams(queryParamsObject);

    Promise.all(promises)
      .then((results) => {
        let commonDestinations = findCommonArrayEls(results);
        setDestinationCities(commonDestinations[0]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (
      queryParamsArray[0] !== null ||
      queryParamsArray[1] !== null ||
      queryParamsArray[2] !== null ||
      queryParamsArray[3] !== null
    ) {
      handleSearch();
    }
  }, []);

  return (
    <div className="Search">
      <section className="origin-city-input-container">
        <div className="origin-input-cities">
          {cityComponents.map((el) => {
            return (
              <OriginSearchItem
                key={el.index}
                allAirports={allAirports}
                itemId={el.itemId}
                listId={el.listId}
                listDefaultVal={el.listDefaultVal}
              />
            );
          })}
        </div>
        <section className="add-remove-search-buttons">
          <>
            {cityComponents.length >= 3 && (
              <button
                className="search-button small-button search-minus"
                onClick={handleRemoveCity}
              >
                -
              </button>
            )}
            {cityComponents.length >= 2 && cityComponents.length <= 3 && (
              <button
                className="search-button small-button"
                onClick={handleAddCity}
              >
                +
              </button>
            )}
          </>

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </section>
      </section>
    </div>
  );
};

export default Search;
