import { useState, useEffect } from "react";

const useGoogleSearch = (term) => {
    const [data, setData] = useState(null);


    return { data };
};
export default useGoogleSearch;
