class HistoryAPI {
    constructor(baseURL) {
        const token = localStorage.getItem("token");
        this.baseURL = baseURL;
        this.getOption = {
            mothod: "get",
            headers: { "authorization": "Bearer " + token }

        }
        this.postOption = {
            method: "post",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token
            }
        }
    }
    refreshToken() {
        this.postOption.headers.authorization = "Bearer " + localStorage.getItem("token")
        this.getOption.headers.authorization = "Bearer " + localStorage.getItem("token")
    }

    //특정달 데이터 조회
    async history(month) {
        this.refreshToken();
        console.log(month, "선택한 달");
        const response = await fetch(this.baseURL + "/api/history?month=" + month, {
            ...this.getOption,
        })
        return await response.json();
    }
    //데이터 추가
    async write(itemDate, useDesc, cashAmt, cardAmt, category, tag) {
        this.refreshToken();
        const response = await fetch(this.baseURL + "/api/history/write", {
            ...this.postOption,
            body: JSON.stringify({
                itemDate, useDesc, cashAmt, cardAmt, category, tag
            })
        })

        return await response.json();
    }

    // 기간별 조회
    async search(begin, end) {
        this.refreshToken();
        const response = await fetch(this.baseURL + "/api/history/search?begin=" + begin + "&end=" + end, {
            ...this.getOption,
        })

        return await response.json();
    }
}
export default HistoryAPI;