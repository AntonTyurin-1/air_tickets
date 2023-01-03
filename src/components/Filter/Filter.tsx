/** @format */

import { useEffect, useState } from "react";
import data from "../../tickets.json";
import { Ticket } from "../Ticket/Ticket";
import "./Filter.css";
import { IFilter, ITickets, TLocalData } from "../../types/type";

export const Filter = () => {

 const arrFilter: IFilter[] =  [
	{
	  value: "all",
	  name: "Все",
	  checked: false,
	},
	{
	  value: 0,
	  name: "Без пересадок",
	  checked: false,
	},
	{
	  value: 1,
	  name: "1 пересадка",
	  checked: false,
	},
	{
	  value: 2,
	  name: "2 пересадки",
	  checked: false,
	},
	{
	  value: 3,
	  name: "3 пересадки",
	  checked: false,
	},
 ]
 
 const [tickets, setTickets] = useState(data["tickets"]);
 
 const [filters, setFilters] = useState(
	JSON.parse(localStorage.getItem('tickets') as TLocalData)
	 || arrFilter
  ); 
// смена валюты

	const choiceCurrency = (name: string) => {
		if(name === 'rub') {
			setTickets(tickets)
		}else if(name === 'usd')  {
			const newCurrency = [...tickets].map(item => {
				return {...item, price: Math.round(item.price/73)}
			})
			setTickets(newCurrency)
		}else if(name === 'eur')  {
			const newCurrency = [...tickets].map(item => {
				return {...item, price: Math.round(item.price/76.95)}
			})
			setTickets(newCurrency)
		}
  }

  

  // фильтрация

  useEffect(() => {
    const activeFilter = filters
      .filter((item:IFilter) => item.checked)
      .map((item:IFilter) => Number(item.value));
    const filteredTickets = data["tickets"]
      .filter((ticket: ITickets) => activeFilter.includes(ticket.stops))
      .sort((ticket1: ITickets, ticket2: ITickets) => ticket1.price - ticket2.price);
    setTickets(filteredTickets);
	 
    localStorage.setItem("tickets", JSON.stringify(filters))
  }, [filters]);

  // выбор checkbox

  const handleCheckbox = (e:any, index: number) => {
    const newFilters = [...filters];

    if (e.target.checked && e.target.name === "all") {
      setFilters(
        newFilters.map((item: IFilter) => {
          return { ...item, checked: true };
        })
      );
      return;
    }
    if (e.target.name === "all" && !e.target.checked) {
      setFilters(
        newFilters.map((item: IFilter) => {
          return { ...item, checked: false };
        })
      );
      return;
    }
    newFilters[0].checked = false;
    newFilters[index].checked = e.target.checked;
    setFilters(newFilters);
  };
  // выбор только одного checkbox

  const onlyOneCheckbox = (e: any, index: number) => {
    const newFilters = [...filters];
    newFilters.map((item: IFilter) => (item.checked = false));
    
    newFilters[index].checked = true;
    setFilters(newFilters);
  };
  return (
    <div className="order">
      <div className="order__filter filter">
        <div className="filter__well">
          <span className="filter__well_title"> Валюта</span>
          <div className="filter__well_buttons">
            <button className="filter__well_button" onClick={() => choiceCurrency('rub')}
				>rub</button>
            <button className="filter__well_button" onClick={() => choiceCurrency('usd')}
				>usd</button>
            <button className="filter__well_button" onClick={() => choiceCurrency('eur')}
				>eur</button>
          </div>
        </div>
        <div className="filter__stops">
          <span className="filter__stops_title"> Количество пересадок</span>
          {filters.map((checkbox: IFilter, index: number) => (
            <div className="filter__stops_item" key={checkbox.name}>
              <label className="filter__stops_label">
                <input
                  className="filter__stops_real_checkbox"
                  name={checkbox.value}
                  type="checkbox"
                  checked={checkbox.checked}
                  onChange={(e) => handleCheckbox(e, index)}
                />
                <span className="filter__stops_custom_checkbox"></span>
                {checkbox.name}
              </label>
              <span
                className="filter__stops_only"
                onClick={(e) => onlyOneCheckbox(e, index)}
              >
                {index === 0 ? '' : 'только'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="order__tickets">
        {tickets.map((ticket) => (
          <Ticket {...ticket} key={ticket.price} />
        ))}
      </div>
    </div>
  );
};
