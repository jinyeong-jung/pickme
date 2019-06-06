export const sortArray = property => {
  let sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return (a, b) => {
    const first = Number(a[property]);
    const second = Number(b[property]);
    if (sortOrder === -1) {
      return first > second ? -1 : first < second ? 1 : 0;
    } else {
      return first < second ? -1 : first > second ? 1 : 0;
    }
  };
};

export const findMyMatches = (matches, championId) => {
  let myMatches = [];
  let end = matches.length - 1;
  let start = 0;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (championId === Number(matches[mid].championId)) {
      let i = mid - 1;
      let j = mid;
      while (championId === Number(matches[i].championId)) {
        myMatches = myMatches.concat(matches[i]);
        if (i !== 0) {
          i--;
        } else {
          break;
        }
      }
      while (championId === Number(matches[j].championId)) {
        myMatches = myMatches.concat(matches[j]);
        if (j < matches.length - 1) {
          j++;
        } else {
          break;
        }
      }
      break;
    } else if (championId > Number(matches[mid].championId)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return myMatches;
};

export const MakeOneArray = (inputArray: any) => {
  let matchedChampions = [];
  for (let i = 0; i <= inputArray.length - 1; i++) {
    matchedChampions = matchedChampions.concat(inputArray[i].theirTeam);
  }
  matchedChampions.sort();
  return matchedChampions;
};

export const SortMatchesByChamps = (
  inputArray: any,
  win: boolean,
  defaultObj: any,
  defaultArr: any
) => {
  let newObject = defaultObj;
  const newArray = defaultArr;
  const allChampions = JSON.parse(
    localStorage.getItem("allChampions") || "no data"
  );

  for (let i = 0; i <= inputArray.length - 1; i++) {
    const champIndex = allChampions
      .map(champ => Object.values(champ)[2])
      .indexOf(inputArray[i]);
    const champName = Object.values(allChampions[champIndex])[3];

    if (Object.keys(newObject).includes(inputArray[i])) {
      if (win) {
        const obj = {
          [inputArray[i]]: {
            ...newObject[inputArray[i]],
            id: inputArray[i],
            name: champName,
            winRate: (
              ((newObject[inputArray[i]].won + 1) /
                (newObject[inputArray[i]].won +
                  1 +
                  newObject[inputArray[i]].lost)) *
              100
            ).toFixed(2),
            won: newObject[inputArray[i]].won + 1
          }
        };
        newObject = Object.assign(newObject, obj);
        newArray[i - newArray.length - 1] = obj;
      } else {
        const obj = {
          [inputArray[i]]: {
            ...newObject[inputArray[i]],
            id: inputArray[i],
            lost: newObject[inputArray[i]].lost + 1,
            name: champName,
            winRate: (
              (newObject[inputArray[i]].won /
                (newObject[inputArray[i]].won +
                  newObject[inputArray[i]].lost +
                  1)) *
              100
            ).toFixed(2)
          }
        };
        newObject = Object.assign(newObject, obj);
        newArray[i - newArray.length - 1] = obj;
      }
    } else {
      if (win) {
        const obj = {
          [inputArray[i]]: {
            id: inputArray[i],
            lost: 0,
            name: champName,
            winRate: ((1 / (0 + 1)) * 100).toFixed(2),
            won: 1
          }
        };
        newObject = Object.assign(newObject, obj);
        newArray.push(obj);
      } else {
        const obj = {
          [inputArray[i]]: {
            id: inputArray[i],
            lost: 1,
            name: champName,
            winRate: ((0 / (0 + 1)) * 100).toFixed(2),
            won: 0
          }
        };
        newArray.push(obj);
        newObject = Object.assign(newObject, obj);
      }
    }
  }
  return [newObject, newArray];
};
