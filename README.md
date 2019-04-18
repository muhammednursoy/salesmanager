# salesmanager

This project aims to provide small business enterprises with a web application that enables them to create and manage a product catalog,
record their sales and generate reports regarding sales made or changes in prices in a period. 

# Getting Started

You will need `java` `gradle` and `node` and postgresql database to build and run this application. Make sure you installed java version 8, gradle v5+ and node v10+ and postgres database.

To build the backend cd into backend directory from a terminal window and run:

```bash
cd backend
gradle clean build
```

gradle will put executable jar in build/libs. We would simply run this jar:

```bash
java -jar build/libs/salesmanager-0.0.1-SNAPSHOT.jar 
```

This will start backend app. To get angular app started, npm install should be run. cd into frontend directory from project root and run npm install. After running npm install we would only need to run it again when a new package is added.
 
 ```bash
npm install
 ```
To start angular app, run following command in frontend directory:

```bash
ng serve 
```

This will start a development server, angular app will be accessable from `localhost:4200`