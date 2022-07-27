import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCheck,
  setCheckAll,
  setUncheckAll,
  selectCheckbox,
  setChangeAllCheck,
  setChangeAllUncheck,
} from "../../redux/slices/filterSlice";

import s from "./Filter.module.scss";

interface IFilter {
  title: string;
  itemName: Array<string>;
}

const Index: FC<IFilter> = ({ title, itemName }) => {
  const dispatch = useDispatch();
  const checked = useSelector(selectCheckbox);
  const checkboxWithoutAll = [...checked].filter((_, i) => i);
  const allChecked = checkboxWithoutAll.every((item) => item);
  const onClickCheckbox: (i: number) => void = (index) => {
    if (index === 0 && checked[0]) dispatch(setUncheckAll());
    if (index === 0 && !checked[0]) dispatch(setCheckAll());
    if (index) dispatch(setCheck(index));
  };

  useEffect(() => {
    if (allChecked) dispatch(setChangeAllCheck());
    if (!allChecked) dispatch(setChangeAllUncheck());
  }, [checked]);

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>{title}</h3>
      <ul className={s.list}>
        {itemName.map((item, index) => (
          <li key={item} className={s.item}>
            <label className={s["item__label"]}>
              <input
                type="checkbox"
                className={s["checkbox-hidden"]}
                checked={checked[index]}
                onChange={() => onClickCheckbox(index)}
              />
              <span className={s["checkbox-fake"]} />
              <span className={s["item__text"]}>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
