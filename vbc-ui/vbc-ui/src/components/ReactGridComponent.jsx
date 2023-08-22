// import React, {useState} from 'react';
// import {ReactGrid} from '@silevis/reactgrid';
// import '@silevis/reactgrid/styles.css';

// const ReactGridComponent = ({tableHeadersData, tableData, onSaveChanges}) => {
//   console.log('TABLE HEADERS DATA=>', tableHeadersData);
//   const dataInitialState = [
//     {name: 'Thomas', surname: 'Goldman'},
//     {name: 'Susie', surname: 'Quattro'},
//     {name: '', surname: ''},
//   ];
//   const [data, setData] = useState(dataInitialState);

//   const applyChangesToState = (changes, prevData) => {
//     changes.forEach((change) => {
//       const personIndex = change.rowId;
//       const fieldName = change.columnId;
//       prevData[personIndex][fieldName] = change.newCell.text;
//     });
//     return [...prevData];
//   };
//   const getColumns = () => [
//     {columnId: 'name', width: 150},
//     {columnId: 'surname', width: 150},
//   ];
//   const headerRow = {
//     rowId: 'header',
//     cells: [
//       {type: 'header', text: 'Name'},
//       {type: 'header', text: 'Surname'},
//     ],
//   };
//   const getRows = (data) => [
//     headerRow,
//     ...data.map((person, idx) => ({
//       rowId: idx,
//       cells: [
//         {type: 'text', text: person.name},
//         {type: 'text', text: person.surname},
//       ],
//     })),
//   ];

//   const rows = getRows(data);
//   const columns = getColumns();

//   const handleChanges = (changes) => {
//     if (changes && changes.length > 0) {
//       setData((prevData) => applyChangesToState(changes, prevData));
//     }
//   };
//   return (
//     <>
//       <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />
//       <div className={`mt-3`}>
//         <button
//           className="btn-patient-theme-small bg-admin px-4"
//           onClick={() => onSaveChanges()}>
//           Save
//         </button>
//       </div>
//     </>
//   );
// };

// export default ReactGridComponent;
