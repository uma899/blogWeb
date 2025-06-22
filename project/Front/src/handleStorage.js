function getArr(arr) {
  const arrayInStorage = localStorage.getItem(arr);
  if (!arrayInStorage) {
    localStorage.setItem(arr, JSON.stringify([]));
    return [];
  }
  return JSON.parse(arrayInStorage);
}

function getValue(key) {
  const arrayInStorage = localStorage.getItem(key);
  if (!arrayInStorage) {
    localStorage.setItem(key, "");
    return "";
  }
  return arrayInStorage;
}

function setValue(key, val) {
  getValue(key);
  localStorage.setItem(key, val);
}

function pushItemInArr(arr, it) {
  let arrayInStorage = getArr(arr);
  arrayInStorage.push(it);
  localStorage.setItem(arr, JSON.stringify(arrayInStorage));
}

function popItemInArr(arr, it) {
  let arrayInStorage = getArr(arr);
  arrayInStorage.pop(it);
  localStorage.setItem(arr, JSON.stringify(arrayInStorage));
}

function findInArr(arr, el) {
  let arrayInStorage = getArr(arr);
  let result = arrayInStorage.findIndex((e) => e == el);

  if (result === -1) {
    return false;
  }

  return true;
}

export { getArr, pushItemInArr, findInArr, popItemInArr, getValue, setValue };
