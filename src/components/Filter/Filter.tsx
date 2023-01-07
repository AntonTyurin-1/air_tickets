/** @format */

import { useEffect, useState } from "react";
import data from "../../tickets.json";
import { Ticket } from "../Ticket/Ticket";
import "./Filter.scss";
import { IFilter, TLocalData, TypeTicket } from "../../types/type";

export const Filter = () => {
  const arrFilter = [
    {
      value: "all",
      name: "Все",
      checked: false,
    },
    {
      value: '0',
      name: "Без пересадок",
      checked: false,
    },
    {
      value: '1',
      name: "1 пересадка",
      checked: false,
    },
    {
      value: '2',
      name: "2 пересадки",
      checked: false,
    },
    {
      value: '3',
      name: "3 пересадки",
      checked: false,
    },
  ];
  

  const [tickets, setTickets] = useState<TypeTicket[]>(data['tickets']);
  
  const [filters, setFilters] = useState<IFilter[]>(
    JSON.parse(localStorage.getItem("tickets") as TLocalData) || arrFilter
  );
  const [typeCurrency, setTypeCurrency] = useState<string>("rub");
 

  // фильтрация
  useEffect(() => {
    const activeFilter = filters
      .filter((item) => item.checked)
      .map((item) => Number(item.value));
    const filteredTickets = data["tickets"].filter((ticket) =>
      activeFilter.includes(ticket.stops)
    );
    setTickets(filteredTickets);

    localStorage.setItem("tickets", JSON.stringify(filters))
  }, [filters]);


  // выбор checkbox
  const handleCheckbox = (e: any, index: number): void => {
    const newFilters = [...filters];

    if (e.target.checked && e.target.name === "all") {
      setFilters(
        newFilters.map((item) => {
          return { ...item, checked: true };
        })
      );
      return;
    }
    if (e.target.name === "all" && !e.target.checked) {
      setFilters(
        newFilters.map((item) => {
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

  const onlyOneCheckbox = (index: number): void => {
    const newFilters = [...filters];
    newFilters.map((item) => (item.checked = false));
    newFilters[index].checked = true;
    setFilters(newFilters);
  };

  return (
    <div className="order">
      <div className="order__filter filter">
        <div className="filter__well">
          <span className="filter__well_title"> Валюта</span>
          <div className="filter__well_buttons">
            <button
              className={
                typeCurrency === "rub"
                  ? "filter__well_button filter__well_button--active"
                  : "filter__well_button"
              }
              onClick={() => setTypeCurrency("rub")}
            >
              rub
            </button>
            <button
              className={
                typeCurrency === "usd"
                  ? "filter__well_button filter__well_button--active"
                  : "filter__well_button"
              }
              onClick={() => setTypeCurrency("usd")}
            >
              usd
            </button>
            <button
              className={
                typeCurrency === "eur"
                  ? "filter__well_button filter__well_button--active"
                  : "filter__well_button"
              }
              onClick={() => setTypeCurrency("eur")}
            >
              eur
            </button>
          </div>
        </div>
        <div className="filter__stops">
          <span className="filter__stops_title"> Количество пересадок</span>
          {filters.map((checkbox, index: number) => (
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
                onClick={() => onlyOneCheckbox(index)}
              >
                {index === 0 ? "" : "только"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="order__tickets">
        {tickets
          .map((ticket, index:any) => (
            <Ticket ticket={ticket} key={index} currentTypeCurrency={typeCurrency}/>
          ))}
      </div>
    </div>
  );
};
