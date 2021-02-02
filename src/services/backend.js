import firebase from 'firebase';
import { db } from '../firebase';

export const subscribeOrder = (callBackReturnOrderList) => {
  db.collection('order').where("status", "==",  "pending").onSnapshot((queryResult) => {
    const arrayPromises = [];
    const arrayData = [];
    queryResult.forEach( (doc) => {
      const data = doc.data();
      arrayData.push({ id: doc.id, ...doc.data() });

      const items = Object.entries(data.itemOrder);

      const arrayPromesasDeItems = items.map( ([, item]) =>  
        item.get().then( dataDelGet => ( { id: dataDelGet.id, ...dataDelGet.data() } )
      ));
      const promesaDeLosItems = Promise.all(arrayPromesasDeItems);

      let promesaDeUsuario = Promise.resolve(null);
      if (data.userRef) 
        promesaDeUsuario = data.userRef.get().then( dataDelGet => ( { id: dataDelGet.id, ...dataDelGet.data() }));

      const promesaDeTodaLaOrden = Promise.all([promesaDeLosItems, promesaDeUsuario]) 

      arrayPromises.push(promesaDeTodaLaOrden);

    });
    //  arrayPromises.push(
    //          Promise.all(Object.entries(data.itemOrder).map( ([index, item]) => item.get())));
    Promise.all(arrayPromises).then(arrayDeArrays => {
      for (let i = 0; i < arrayDeArrays.length; i++) {
        let [items, user] = arrayDeArrays[i];
        arrayData[i].items =  items;
        arrayData[i].user = user;
      }
      callBackReturnOrderList(arrayData)

    });
  });
};


export const subscribeDelivery = (callBackReturnDeliveryList) => {
  db.collection('order').where("status", "==",  "done").onSnapshot((queryResult) => {
    const arrayPromises = [];
    const arrayData = [];
    queryResult.forEach( (doc) => {
      const data = doc.data();
      arrayData.push({ id: doc.id, ...doc.data() });

      const items = Object.entries(data.itemOrder);

      const arrayPromesasDeItems = items.map( ([, item]) =>  
        item.get().then( dataDelGet => ( { id: dataDelGet.id, ...dataDelGet.data() } )
      ));
      const promesaDeLosItems = Promise.all(arrayPromesasDeItems);

      let promesaDeUsuario = Promise.resolve(null);
      if (data.userRef) 
        promesaDeUsuario = data.userRef.get().then( dataDelGet => ( { id: dataDelGet.id, ...dataDelGet.data() }));

      const promesaDeTodaLaOrden = Promise.all([promesaDeLosItems, promesaDeUsuario]) 

      arrayPromises.push(promesaDeTodaLaOrden);

    });
    //  arrayPromises.push(
    //          Promise.all(Object.entries(data.itemOrder).map( ([index, item]) => item.get())));
    Promise.all(arrayPromises).then(arrayDeArrays => {
      for (let i = 0; i < arrayDeArrays.length; i++) {
        let [items, user] = arrayDeArrays[i];
        arrayData[i].items =  items;
        arrayData[i].user = user;
      }
      callBackReturnDeliveryList(arrayData)

    });
  });
};


export const subscribeMenu = (callBackReturnMenu, menuType ) => {
  db.collection('items').where("menu", "==",  menuType).get()
    .then((results) => {
      let menuArray =[];
      results.forEach(item => menuArray.push(( { id: item.id, ...item.data() } )));
      callBackReturnMenu(menuArray);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

export const subscribeMenuHamb = (callBackReturnMenu, menuType ) => {
  db.collection('items').where("category", "==",  menuType).get()
    .then((results) => {
      let menuArray =[];
      results.forEach(item => menuArray.push(( { id: item.id, ...item.data() } )));
      callBackReturnMenu(menuArray);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

export const subscribeWaiters = (callBackReturnWaiters) => {
  db.collection('users').where("position", "==", "waiter").get()
    .then((results) => {
      let userArray =[];
      results.forEach(user => userArray.push(( { id: user.id, ...user.data() } )));
      callBackReturnWaiters(userArray);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

export const subscribeTables = (callBackReturnTables, name) => {
  db.collection('users').where("name", "==", name).onSnapshot( queryResult => {
    let arrayTables = [];
    queryResult.forEach((doc) => {
      let data = doc.data();
      // let tables = Object.values(data.tables);
      return arrayTables = data.tables;
      
    });
    callBackReturnTables(arrayTables);
  });
}

export const saveOrder = (order) => {

  let orderToSave = {
    time: order.time,
    status: order.status,
    userRef: {},
    itemOrder: {}
  }

  for(let i = 0; i < order.items.length; i++)
    orderToSave.itemOrder[i.toString()] = db.doc("items/" + order.items[i].id)
  
  orderToSave.userRef = db.doc("users/" + order.userRef.uid)
  
  db.collection('order').doc().set(orderToSave);
};

export const updateStatus = (id, order) => {
  let statusToUpdate = {
    endtime: order.endtime,
    status: order.status,
    wait: order.wait
  }
  db.collection('order').doc(id).update(statusToUpdate);
};

export const updateStatusDelivered = (id, order) => {
  let statusToUpdate = {
    status: order.status,
  }
  db.collection('order').doc(id).update(statusToUpdate);
};

export const setUser = (user) => {
  db.collection('users')
    .doc(user.uid)
    .set(user)
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch(e => console.log('error', e));
};

export const getCurrentUser = () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) return Promise.resolve(null);
  const docRef = firebase.firestore().collection('users').doc(currentUser.uid);
  return docRef.get()
    .then(doc => doc.data())
    .catch(e => console.log('error while getting currentUser docRef', e));
};




// export const subscribeDelivery = (callBackReturnDeliveryList) => {
//   db.collection('order').where("status", "==",  "done").onSnapshot((queryResult) => {
//     const arrayPromises = [];
//     const arrayData = [];
//     queryResult.forEach((doc) => {
//       let data = doc.data();
//       arrayData.push({ id: doc.id, ...doc.data() });

//       let items = Object.entries(data.itemOrder);

//       let promesasDeItems = items.map( ([, item]) =>  
//         item.get().then( dataDelGet => ( { id: dataDelGet.id, ...dataDelGet.data() } )
//       ))

//       let unaSolaPromesaPaquete = Promise.all(promesasDeItems);
//       arrayPromises.push(unaSolaPromesaPaquete);

//     })
//     //  arrayPromises.push(
//     //          Promise.all(Object.entries(data.itemOrder).map( ([index, item]) => item.get())));
//     Promise.all(arrayPromises).then(arrayDeArrays => {
//       for (let i = 0; i < arrayDeArrays.length; i++)
//         arrayData[i].items =  arrayDeArrays[i];
//       callBackReturnDeliveryList(arrayData)
//     });
//   });
// };

// export const getCurrentUser = () => {
//   const currentUser = firebase.auth().currentUser;
//   if (!currentUser) return Promise.resolve(null);
//   const docRef = firebase.firestore().collection('users').doc(currentUser.uid);
//   return docRef.get()
//     .then(doc => doc.data())
//     .catch(e => console.log('error while getting currentUser docRef', e));
// };

// export const subscribeTables = (callBackReturnTables) => {
//   db.collection('tables').orderBy('table', 'asc').onSnapshot( queryResult => {
//     const arrayPromises = [];
//     queryResult.forEach((doc) => {
//       arrayPromises.push({ id: doc.id, ...doc.data() });
//     });
//     Promise.all(arrayPromises).then(
//       tablesArray => callBackReturnTables(tablesArray),
//     );
//   });
// }

// export const subscribeGetCurrentUser = (callBackReturnUsers) => {
//   const currentUser = firebase.auth().currentUser;
//   if (!currentUser) return Promise.resolve(null);
//   const docRef = firebase.firestore().collection('users').doc(currentUser.uid);
//   return docRef.get()
//     .then((doc) => {
//       const userArray =[];
//       userArray.push(({ id: doc.id, ...doc.data()}));
//       callBackReturnUsers(userArray)
//     })
//     .catch(e => console.log('error while getting currentUser docRef', e));
// };

// export const subscribeCurrentUser = (callBackReturnUsers) => {
//   db.collection('users').get()
//     .then((results) => {
//       let usersArray =[];
//       results.forEach(user => usersArray.push(( { id: user.id, ...user.data() } )));
//       callBackReturnUsers(usersArray);
//     })
//     .catch((error) => {
//       console.log("Error getting documents: ", error);
//     });
// }

// export const subscribeCurrentUser = (callBackReturnUsers) => {
//   const currentUser = firebase.auth().currentUser;
//   if (!currentUser) return Promise.resolve(null);
//   firebase.firestore().collection('users').doc(currentUser.uid)
//     .then((results) => {
//       let usersArray =[];
//       results.forEach(user => usersArray.push(( { id: user.id, ...user.data() } )));
//       callBackReturnUsers(usersArray);
//     })
//     .catch((error) => {
//       console.log("Error getting documents: ", error);
//     });
// }
