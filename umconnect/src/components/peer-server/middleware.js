const peerServerMiddleware = store => next => action => {

    console.log('peer-serverMiddleware action: %o', action);
    if (!action.meta || action.meta.type !== "api") {
      return next(action);
    }

    return next(action);
    
  };
  
  export default peerServerMiddleware;
  