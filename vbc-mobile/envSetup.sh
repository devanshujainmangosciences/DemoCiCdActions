FOLDER_NAME="dev";
if [ "$ENV" = "prod" ];
then
    FOLDER_NAME="prod";
elif [ "$ENV" = "test" ];
then
    FOLDER_NAME="test";
else 
    FOLDER_NAME="dev";  
fi

echo "Switching to ${FOLDER_NAME} environment";
echo "Fetching GoogleServices file from ./src/configurations/${FOLDER_NAME}/google-services.json"
yes | cp -rf "./src/configurations/${FOLDER_NAME}/.env.${FOLDER_NAME}" .env
yes | cp -rf "./src/configurations/${FOLDER_NAME}/google-services.json" android/app
yes | cp -rf "./src/configurations/${FOLDER_NAME}/GoogleService-Info.plist" ios/