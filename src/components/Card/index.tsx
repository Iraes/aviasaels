import { FC } from "react";
import { format, addMinutes } from "date-fns";

import { Ticket } from "../../types/ticket";

import s from "./Card.module.scss";

const getPadTime = (time: number): string => time.toString().padStart(2, "0");
const Card: FC<{ ticket: Ticket }> = ({ ticket }) => {
  const { price, carrier, segments } = ticket;
  const transferCountTo = segments[0].stops.length
    ? `${segments[0].stops.length}`
    : "";

  const transferCountBack = segments[1].stops.length
    ? `${segments[1].stops.length}`
    : "";

  function transferName(transferCount: string): string {
    if (Number(transferCount) === 1) {
      return "пересадка";
    } else if (Number(transferCount) > 1 && Number(transferCount) <= 4) {
      return "пересадки";
    } else {
      return "пересадок";
    }
  }

  const dateTo = `${format(new Date(segments[0].date), "H:m")} - ${format(
    addMinutes(new Date(segments[0].date), segments[0].duration),
    "H:m"
  )}`;
  const dateBack = `${format(new Date(segments[1].date), "H:m")} - ${format(
    addMinutes(new Date(segments[1].date), segments[1].duration),
    "H:m"
  )}`;

  return (
    <div className={s.card}>
      <div className={s.header}>
        <p className={s.price}>
          {price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} ₽
        </p>
        <img
          className={s.logo}
          src={`//pics.avs.io/99/36/${carrier}.png`}
          alt="Логотип авиакомпании"
        />
      </div>
      <div className={s.info}>
        <div className={s["info__wrapper"]}>
          <h3 className={s.title}>
            {segments[0].origin} – {segments[0].destination}
          </h3>
          <p className={s.description}>{dateTo}</p>
        </div>
        <div className={s["info__wrapper"]}>
          <h3 className={s.title}>В пути</h3>
          <p className={s.description}>
            {`${getPadTime(Math.floor(segments[0].duration / 60))}Ч 
           ${getPadTime(segments[0].duration % 60)}М`}
          </p>
        </div>
        <div className={s["info__wrapper"]}>
          <h3 className={s.title}>
            {transferCountTo + " " + transferName(transferCountTo)}
          </h3>
          <p className={s.description}>
            {transferCountTo ? segments[0].stops.join(", ") : "НЕТ"}
          </p>
        </div>
      </div>
      <div className={s.info}>
        <div className={s["info__wrapper"]}>
          <h3 className={s.title}>
            {segments[1].origin} – {segments[1].destination}
          </h3>
          <p className={s.description}>{dateBack}</p>
        </div>
        <div className={s["info__wrapper"]}>
          <h3 className={s.title}>В пути</h3>
          <p className={s.description}>{`${getPadTime(
            Math.floor(segments[1].duration / 60)
          )}Ч ${getPadTime(segments[1].duration % 60)}М`}</p>
        </div>
        <div className={s["info__wrapper"]}>
          <h3 className={s.title}>
            {transferCountBack + " " + transferName(transferCountBack)}
          </h3>
          <p className={s.description}>
            {transferCountBack ? segments[1].stops.join(", ") : "НЕТ"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
