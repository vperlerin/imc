 
import { countries } from "data/countries"; 

export const useCountryName = (code) => { 
    const country = countries.find((c) => c.code === code);
    return country ? country.name : "";
   
};
 