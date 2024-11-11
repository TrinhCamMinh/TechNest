const useAuthenticate = () => {
    const authData:string | null = localStorage.getItem('authenticate');
    if(!authData) return [false, null];
    const userData:string = JSON.parse(authData);
    return [true, userData];
};

export default useAuthenticate;