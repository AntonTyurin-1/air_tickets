/** @format */
import "./Ticket.css";
import logo from "./img/Logo.jpg";
import {getPadTime} from '../../helpers/getPadTime'
import { ITickets } from "../../types/type";

export const Ticket = (ticket: ITickets) => {
  const stopsCount = ():string => {
    if (ticket.stops === 1) {
      return ticket.stops + " пересадка";
    } else if (ticket.stops === 0) {
      return "Без пересадок";
    }
    return ticket.stops + " пересадки";
  };

  return (
    <div className="ticket" >
      <div className="ticket__img">
        <img src={logo} alt="logo" width="150px" />
        <div className="ticket__price">
          <span>
            <strong>Купить</strong>
          </span>
          <span>
            <strong>за {ticket.price} </strong>
          </span>
        </div>
      </div>
      <div className="ticket__flight-info">
        <div className="ticket__time">
          <span className="ticket__departure_time">
            {getPadTime(ticket.departure_time)}
          </span>
          <div className="ticket__stops">
            <span className="ticket__stops-count">{stopsCount()}</span>
            <span className="ticket__stops-img">
              <i className="material-icons">airplanemode_active</i>
            </span>
          </div>
          <span className="ticket__departure_time">{getPadTime(ticket.arrival_time)}</span>
        </div>

        <div className="ticket__direction">
          <div className="ticket__departure">
            <span className="ticket__departure-city">
              {ticket.origin}, &nbsp;{ticket.origin_name}
            </span>
            <span className="ticket__departure-date">
              {ticket.departure_date}, Пт
            </span>
          </div>
          <div className="ticket__departure">
            <span className="ticket__departure-city">
              {ticket.destination},&nbsp;{ticket.destination_name}
            </span>
            <span className="ticket__departure-date">
              {ticket.arrival_date}, Пт
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
