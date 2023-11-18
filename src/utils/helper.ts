export const getErrorMessage = (error: any) => {
    let errorMessage;
  
    if (error) {
      if ("status" in error) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.data);
  
        errorMessage = errMsg;
      } else {
        errorMessage = error.message;
      }
    } else {
      errorMessage = "Unable to fetch the data. Please try again later.";
    }
  
    return errorMessage;
  };