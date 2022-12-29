import { useEffect, useRef, useState } from "react";
import SearchChart from "./searchChart";

function Search({ historyAPI, logon }) {
  const [range, setRange] = useState({});
  const [datas, setDatas] = useState([]);

  const beginRef = useRef();
  const endRef = useRef();

  const handleChange = (evt) => {
    setRange({ ...range, [evt.target.name]: evt.target.value });
  };

  useEffect(() => {
    endRef.current.value = new Date().toISOString().slice(0, 10);
    beginRef.current.value = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
      .toISOString()
      .slice(0, 10);
    setRange({ begin: beginRef.current.value, end: endRef.current.value });
  }, []);

  useEffect(() => {
    if (!range.begin || !range.end) {
      return;
    }
    historyAPI.search(range.begin, range.end).then((recv) => {
      if (recv.result) {
        console.log(recv);
        setDatas(recv.datas);
      }
    });
  }, [range]);
  // console.log(datas)

  const Sub = ({ list }) => {
    return list.map((data) => {
      return (
        <tr key={data._id}>
          <td>{<input type="checkbox" />}</td>
          <td>{data.itemDate}</td>
          <td>{data.useDesc}</td>
          <td>
            {data.cashAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </td>
          <td>
            {data.cardAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </td>
          <td>{data.category}</td>
          <td>{data.tag}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text">검색기간</span>
        <input
          type="date"
          className="form-control"
          name="begin"
          onChange={handleChange}
          ref={beginRef}
        />
        <span className="input-group-text"> ~ </span>
        <input
          type="date"
          className="form-control"
          name="end"
          onChange={handleChange}
          ref={endRef}
        />
      </div>

      <div>
        <SearchChart datas={datas} />
        <table className="table table-hover" style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <td>{<input type="checkbox" />}</td>
              <td>일자</td>
              <td>사용내역</td>
              <td>현금</td>
              <td>카드</td>
              <td>카테고리</td>
              <td>태그</td>
            </tr>
          </thead>
          <tbody>
            <Sub list={datas}></Sub>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Search;
