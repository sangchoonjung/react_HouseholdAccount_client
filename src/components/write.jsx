import { useRef, useState } from "react";

function Write({ historyAPI }) {
  const itemDate = useRef();
  const useDesc = useRef();
  const cashAmt = useRef();
  const cardAmt = useRef();
  const category = useRef();
  const tag = useRef();
  const [item, setItem] = useState({});

  const handleCreate = (evt) => {
    evt.preventDefault();
    historyAPI
      .write(
        itemDate.current.value,
        useDesc.current.value,
        cashAmt.current.value,
        cardAmt.current.value,
        category.current.value,
        tag.current.value
      )
      .then((received) => {
        console.log(received);
        if (received.result) {
          setItem(received.message);
          alert("등록완료되었습니다.");
        }
      });
    evt.target.reset();
  };

  return (
    <form
      className="mt-4"
      onSubmit={handleCreate}
      style={{ maxWidth: "30rem" }}
    >
      <h2>소비내역 기입</h2>
      <div className="form-floating mb-3">
        <input type="date" className="form-control" id="floa" ref={itemDate} />
        <label htmlFor="itemDate">소비날짜</label>
      </div>

      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floa" ref={useDesc} />
        <label htmlFor="useDesc">사용내역</label>
      </div>

      <div className="row g-2">
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floa" ref={cashAmt} />
          <label htmlFor="cashAmt">현금</label>
        </div>

        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floa" ref={cardAmt} />
          <label htmlFor="cardAmt">카드</label>
        </div>
      </div>

      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          ref={category}
        >
          <option selected value="미분류">
            미분류
          </option>
          <option value="생활">생활</option>
          <option value="교통">교통</option>
          <option value="고정비">고정비</option>
          <option value="기타">기타</option>
        </select>
        <label htmlFor="floatingSelect">카테고리</label>
      </div>

      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floa" ref={tag} />
        <label htmlFor="tag">태그</label>
      </div>

      <div className="text-end">
        <button className="btn btn-primary" type="submit">
          등록
        </button>
      </div>
    </form>
  );
}
export default Write;
