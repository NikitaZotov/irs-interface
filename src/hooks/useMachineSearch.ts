import { useState, useEffect } from "react";

export const useMachineSearch = (term: any) => {
    const [data, setData] = useState(null);


    return { data };
};
