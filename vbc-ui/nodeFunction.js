/**
 * This Function is used to create the admin components.
 * It will create two components inside src/pages/createUIAdminPages and one folder where the components will be placed
 *      1.ComponentList.js
 *          This component will handle the table view and serve as the main component in the sidebar, It will consists of data lising and button to add,edit, view and delete data
 *      2.ComponentNew.js
 *          This component will handle the creation/updation/view of the data in a sperate page for which route should be defined before hand
 * 
 * To sucessfully execute this command following files needs to be created before hand and view/update/edit/add routes to be defined in routes.js and routeConfig.js
 * 
 * Files Required beforehand:-
 *       1. ComponentDataVariables.js(eg:-LenderDataVariable.js) file inside masterDataConfig folder 
 *       2. componentData.json(eg:-lender.json) file inside masterDataConfig folder and this also need to be added in the index.js of masterDataConfig file
 *          This fill will contain all the required variables needed for the component
 *            "dataVariables": "ComponentDataVariables"=>  File name created in first step
              "readListAction": "readData"=> Action creator to fetch the list of data   
              "deleteDataAction": "deleteData"=> Action Creator to delete the data
              "reduxDataListState": "state.data.list"=> Redux state for data list
              "reduxPaginationData": "state.data.pagination"=> Redux state for pagination
              "tableHeadersPath": "tableHeadersLenders"=> Table header file name which is used to map the Table data,p
              "updateData": "updateData"=> Action Creator to update the data
              "createData": "createData",=> Action Creator to create the data
              "showData": "showData"=> Action Creator to save the data that is being viewed/edited
              "newPath": "NewData",=> Route path name for New Data Page
              "viewPath": "ViewData"=> Route path name for View Data Page
              "updatePath": "UpdateData"=> Route path name for Update Data Page
              "listPath": "ListData"=> Route path name for List Data page
              "reduxSelectedData": "state.Data.selectedData"=> State for selected data state in redux when showData action creator is called.
 * 
 * passing true in last will not create CURD File
 * To run the script :- 1. Open the terminal ctrl + ~
 *                      2. run command:- node nodeFunction componentName componentData.json true
 */
var fs = require('fs');

const arguments = process.argv;
const directory = arguments[1];
const folderName = arguments[2];
const configFileName = arguments[3];
const onlyListFile = arguments[4];

const listComponentName =
  folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase();
const path = directory.replace('nodeFunction', '').trim();
const splittedPath = path.split('\\');
let correctPath = '';
splittedPath.map((path) => (correctPath = correctPath + path + '/'));
const reqPath = correctPath.replace('//', '/').trim();
const defaultListFilePath = `${reqPath}src/pages/createUIAdminPages/DefaultListingFile.js`;
const defaultAddEditFilePath = `${reqPath}src/pages/createUIAdminPages/DefaultAddEditFile.js`;
const configFilePath = `${reqPath}src/masterDataConfig/${configFileName}`;
const reqFolderPath = `${reqPath}src/pages/createUIAdminPages/${folderName}`;
const reqMainComponentPath = `${reqFolderPath}/${listComponentName}List.js`;
const reqCurdComponentPath = `${reqFolderPath}/${listComponentName}New.js`;

//Create Directory

function createFolder() {
  if (!fs.existsSync(reqFolderPath)) {
    fs.mkdirSync(reqFolderPath, {
      recursive: true,
    });
  }
}

//Create File
function copyFiles() {
  fs.copyFile(defaultListFilePath, reqMainComponentPath, (err) => {
    if (err) throw err;
    const newContent = replaceFileContentsForListComponent(
      configFilePath,
      reqMainComponentPath
    );
    writeNormalFile(reqMainComponentPath, newContent);
    console.log(`${defaultListFilePath} was copied to ${reqMainComponentPath}`);
    if (onlyListFile === 'false' || !onlyListFile) {
      fs.copyFile(defaultAddEditFilePath, reqCurdComponentPath, (err) => {
        if (err) throw err;
        const newContent = replaceFileContentsForCurdComponent(
          configFilePath,
          reqCurdComponentPath
        );
        writeNormalFile(reqCurdComponentPath, newContent);
        console.log(
          `${defaultAddEditFilePath} was copied to ${reqCurdComponentPath}`
        );
      });
    }
  });
}

function replaceFileContentsForListComponent(configFile, createdFile) {
  const jsonData = readJsonFile(configFile);
  // console.log('JSON DATA=>', jsonData);
  const {
    dataVariables,
    readListAction,
    deleteDataAction,
    reduxDataListState,
    reduxPaginationData,
    tableHeadersPath,
    newPath,
  } = jsonData;

  // console.log('DATA VARIABLES=>', readListAction);

  const createdFileData = readNormalFile(createdFile);
  const ComponentName = `${listComponentName}List`;

  const searchRegExp1 = /dataVariables/gi;
  const searchRegExp2 = /readListAction/gi;
  const searchRegExp3 = /deleteDataAction/gi;
  const searchRegExp4 = /reduxDataListState/gi;
  const searchRegExp5 = /reduxPaginationData/gi;
  const searchRegExp6 = /tableHeadersPath/gi;
  const searchRegExp7 = /newPath/gi;
  const searchRegExp8 = /ComponentName/gi;
  const result = createdFileData
    .replace(searchRegExp1, dataVariables)
    .replace(searchRegExp2, readListAction)
    .replace(searchRegExp3, deleteDataAction)
    .replace(searchRegExp4, reduxDataListState)
    .replace(searchRegExp5, reduxPaginationData)
    .replace(searchRegExp6, tableHeadersPath)
    .replace(searchRegExp7, newPath)
    .replace(searchRegExp8, ComponentName);
  // console.log('RESULT=>', result);
  return result;
}

function replaceFileContentsForCurdComponent(configFile, createdFile) {
  const jsonData = readJsonFile(configFile);
  // console.log('JSON DATA=>', jsonData);
  const {
    dataVariables,
    createData,
    updateData,
    newPath,
    viewPath,
    updatePath,
    listPath,
    showData,
    reduxSelectedData,
  } = jsonData;
  const ComponentName = `${listComponentName}New`;
  // console.log('DATA VARIABLES=>', readListAction);

  const createdFileData = readNormalFile(createdFile);

  const searchRegExp1 = /dataVariables/gi;
  const searchRegExp2 = /createData/gi;
  const searchRegExp3 = /updateData/gi;
  const searchRegExp4 = /newPath/gi;
  const searchRegExp5 = /viewPath/gi;
  const searchRegExp6 = /updatePath/gi;
  const searchRegExp7 = /listPath/gi;
  const searchRegExp8 = /showData/gi;
  const searchRegExp9 = /ComponentName/gi;
  const searchRegExp10 = /reduxSelectedData/gi;
  const result = createdFileData
    .replace(searchRegExp1, dataVariables)
    .replace(searchRegExp2, createData)
    .replace(searchRegExp3, updateData)
    .replace(searchRegExp4, newPath)
    .replace(searchRegExp5, viewPath)
    .replace(searchRegExp6, updatePath)
    .replace(searchRegExp7, listPath)
    .replace(searchRegExp8, showData)
    .replace(searchRegExp9, ComponentName)
    .replace(searchRegExp10, reduxSelectedData);
  // console.log('RESULT=>', result);
  return result;
}

function readJsonFile(file) {
  let bufferData = fs.readFileSync(file);
  let stData = bufferData.toString();
  let data = JSON.parse(stData);
  return data;
}

function readNormalFile(file) {
  let data = fs.readFileSync(file, 'utf-8');
  return data;
}
function writeNormalFile(file, newFileContents) {
  fs.writeFileSync(file, newFileContents, 'utf-8');
}

createFolder();
copyFiles();
