const isAdmin = () => {
    console.log(localStorage.getItem('token'), "토큰");
    // localStorage.setItem('token', 'tokenWWWWW');
    return !!localStorage.getItem('token');
};

export default isAdmin;