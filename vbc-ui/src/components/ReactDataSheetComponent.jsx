// import React, {useState} from 'react';
// import Datasheet from 'react-datasheet';
// import 'react-datasheet/lib/react-datasheet.css';
// const ReactDataSheetComponent = () => {
//   const [state, setState] = useState({
//     grid: [
//       [
//         {readOnly: true, value: ''},
//         {value: 'A', readOnly: true},
//         {value: 'B', readOnly: true},
//         {value: 'C', readOnly: true},
//         {value: 'D', readOnly: true},
//       ],
//       [
//         {readOnly: true, value: 1},
//         {value: 1},
//         {value: 3},
//         {value: 3},
//         {value: 3},
//       ],
//       [
//         {readOnly: true, value: 2},
//         {value: 2},
//         {value: 4},
//         {value: 4},
//         {value: 4},
//       ],
//       [
//         {readOnly: true, value: 3},
//         {value: 1},
//         {value: 3},
//         {value: 3},
//         {value: 3},
//       ],
//       [
//         {readOnly: true, value: 4},
//         {value: 2},
//         {value: 4},
//         {value: 4},
//         {value: 4},
//       ],
//     ],
//   });
//   const valueRenderer = (cell) => cell.value;
//   const onCellsChanged = (changes) => {
//     const grid = state.grid;
//     changes.forEach(({cell, row, col, value}) => {
//       grid[row][col] = {...grid[row][col], value};
//     });
//     setState({grid});
//   };
//   const onContextMenu = (e, cell, i, j) =>
//     cell.readOnly ? e.preventDefault() : null;
//   return (
//     <Datasheet
//       data={state.grid}
//       valueRenderer={valueRenderer}
//       onContextMenu={onContextMenu}
//       onCellsChanged={onCellsChanged}
//     />
//   );
// };

// export default ReactDataSheetComponent;
