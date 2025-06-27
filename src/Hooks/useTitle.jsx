import React, { useEffect } from 'react';

const useTitle = (title) => {
   useEffect(()=>{
const baseTitle = "Mehedi Akash"
    document.title=title? `${title} | ${baseTitle}`:baseTitle;
   },[title])
};

export default useTitle;